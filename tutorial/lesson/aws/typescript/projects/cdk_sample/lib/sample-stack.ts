import * as cdk from '@aws-cdk/core';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import * as lambda from '@aws-cdk/aws-lambda';
import { NODE_LAMBDA_LAYER_DIR } from './process/setup';
export class SampleStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new NodejsFunction(this, 'hello', {
      runtime: lambda.Runtime.NODEJS_14_X,
      entry: 'src/lambda/handlers/hello.ts',
      functionName: 'kotahello',
      handler: 'lambdaHandler'
    });

    const nodeModulesLayer = new lambda.LayerVersion(this, 'NodeModulesLayer',
      {
        code: lambda.AssetCode.fromAsset(NODE_LAMBDA_LAYER_DIR),
        compatibleRuntimes: [lambda.Runtime.NODEJS_14_X]
      }
    );

    new NodejsFunction(this, 'test', {
      runtime: lambda.Runtime.NODEJS_14_X,
      entry: 'src/lambda/handlers/test.ts',
      functionName: 'kotatest',
      bundling: {
        externalModules: [
          'aws-sdk', // Use the 'aws-sdk' available in the Lambda runtime
          'date-fns', // Layrerに入れておきたいモジュール
        ],
        define: { // Replace strings during build time
          'process.env.API_KEY': JSON.stringify(`\\"${'xxx-xxx'}\\"`), // バグってそう.エスケープしないとInvalid define valueのエラー
        },
      },
      layers: [nodeModulesLayer],
    });

  }
}
