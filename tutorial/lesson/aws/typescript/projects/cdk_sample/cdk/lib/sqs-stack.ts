import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { entryHandlerDir } from './constants';
import { LambdaRestApi } from '@aws-cdk/aws-apigateway';
import { Queue } from '@aws-cdk/aws-sqs';
import { PolicyStatement } from '@aws-cdk/aws-iam';
import { SqsEventSource } from '@aws-cdk/aws-lambda-event-sources';
import { CfnOutput } from '@aws-cdk/core';

export class SQSStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const sqsFrontLambda = new NodejsFunction(this, 'sqs-front', {
      runtime: lambda.Runtime.NODEJS_14_X,
      entry: `${entryHandlerDir}/api/sqs-front.ts`,
      handler: 'lambdaHandler',
      bundling: {
        sourceMap: true,
      },
    });
    const RestAPI = new LambdaRestApi(this, 'FrontAPI', {
      handler: sqsFrontLambda
    });
    const queue = new Queue(this, 'queue', {});
    const sqsBackendLambda = new NodejsFunction(this, 'BackendLambda', {
      entry: `${entryHandlerDir}/sqs/sqs-backend.ts`,
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_14_X,
    });
    sqsFrontLambda.addEnvironment('QUEUE_URL', queue.queueUrl);
    sqsFrontLambda.addToRolePolicy(new PolicyStatement({ actions: ['sqs:SendMessage'], resources: [queue.queueArn] }));
    const eventSource = sqsBackendLambda.addEventSource(new SqsEventSource(queue));
    new CfnOutput(this, "Endpoint", { value: `http://localhost:4566/restapis/${RestAPI.restApiId}/prod/_user_request_${RestAPI.root.path}` })
  }
}
