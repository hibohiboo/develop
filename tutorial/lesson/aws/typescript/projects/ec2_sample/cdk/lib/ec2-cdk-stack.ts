import * as ec2 from "@aws-cdk/aws-ec2";
import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam'
import * as path from 'path';
import { KeyPair } from 'cdk-ec2-key-pair';
import { Asset } from '@aws-cdk/aws-s3-assets';

// https://github.com/pranavkakde/aws-cdk-load-test-jmeter/blob/master/lib/ec2-stack.ts

export class Ec2CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a Key Pair to be used with this EC2 Instance
    const key = new KeyPair(this, 'ec2-cdkstack-KeyPair', {
      name: 'cdk-keypair',
      description: 'Key Pair created with CDK Deployment',
    });
    key.grantReadOnPublicKey

    // Create new VPC with 2 Subnets
    const vpc = new ec2.Vpc(this, 'ec2-cdkstack-VPC', {
      natGateways: 0,
      subnetConfiguration: [{
        cidrMask: 24,
        name: "asterisk",
        subnetType: ec2.SubnetType.PUBLIC
      }]
    });

    // Allow SSH (TCP Port 22) access from anywhere
    const securityGroup = new ec2.SecurityGroup(this, 'ec2-cdkstack-SecurityGroup', {
      vpc,
      description: 'Allow SSH (TCP port 22) in',
      allowAllOutbound: true
    });
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'Allow SSH Access')

    const role = new iam.Role(this, 'ec2-cdkstack-ec2Role', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com')
    })

    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'))

    // Use Latest Amazon Linux Image
    const ami = new ec2.AmazonLinuxImage({
      generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      cpuType: ec2.AmazonLinuxCpuType.X86_64
    });

    // Create the instance using the Security Group, AMI, and KeyPair defined in the VPC created
    const ec2Instance = new ec2.Instance(this, 'ec2-cdkstack-Instance', {
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.NANO),
      machineImage: ami,
      securityGroup: securityGroup,
      keyName: key.keyPairName,
      role: role
    });

    // Create an asset that will be used as part of User Data to run on first load
    const asset = new Asset(this, 'ec2-cdkstack-Asset', { path: path.join(__dirname, '../src/config.sh') });
    const localPath = ec2Instance.userData.addS3DownloadCommand({
      bucket: asset.bucket,
      bucketKey: asset.s3ObjectKey,
    });

    ec2Instance.userData.addExecuteFileCommand({
      filePath: localPath,
      arguments: '--verbose -y'
    });
    asset.grantRead(ec2Instance.role);

    // Create outputs for connecting
    new cdk.CfnOutput(this, 'IP Address', { value: ec2Instance.instancePublicIp });
    new cdk.CfnOutput(this, 'Key Name', { value: key.keyPairName })
    new cdk.CfnOutput(this, 'Download Key Command', { value: 'aws secretsmanager get-secret-value --secret-id ec2-ssh-key/cdk-keypair/private --query SecretString --output text > cdk-key.pem && chmod 400 cdk-key.pem' })
    new cdk.CfnOutput(this, 'ssh command', { value: 'ssh -i cdk-key.pem -o IdentitiesOnly=yes ec2-user@' + ec2Instance.instancePublicIp })
  }
}