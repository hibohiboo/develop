import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import * as apigateway from '@aws-cdk/aws-apigateway'
import { NODE_LAMBDA_LAYER_DIR } from './process/setup';

export class SampleStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const entryHandlerDir = '../src/lambda/handlers/';
    const helloFunction = new NodejsFunction(this, 'hello', {
      runtime: lambda.Runtime.NODEJS_14_X,
      entry: `${entryHandlerDir}/hello.ts`,
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
      entry: `${entryHandlerDir}/test.ts`,
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
    const echoFunction = new NodejsFunction(this, 'echo', {
      runtime: lambda.Runtime.NODEJS_14_X,
      entry: `${entryHandlerDir}/get-echo.ts`,
      functionName: 'get-echo',
      handler: 'echoHandler'
    });

    const environment = {
      DOCUMENTDB_CONNECTION_STRING: process.env.DOCUMENTDB_CONNECTION_STRING || '',
      DEFAULT_DB_NAME: process.env.DEFAULT_DB_NAME || ''
    }
    // const environment = {
    //   DOCUMENTDB_CONNECTION_STRING: 'mongodb://host.docker.internal:27017',
    //   DEFAULT_DB_NAME: 'sample'
    // }

    const bundling = {
      externalModules: ['aws-sdk', 'mongodb', 'mongodb-client-encryption'],
    }
    const mongoFunctionOptions = { environment, bundling, layers: [nodeModulesLayer] }

    const getUserFunction = new NodejsFunction(this, 'getUser', {
      runtime: lambda.Runtime.NODEJS_14_X,
      entry: `${entryHandlerDir}/users/get-user.ts`,
      functionName: 'get-user',
      handler: 'lambdaHandler',
      ...mongoFunctionOptions,
    });
    const postUserFunction = new NodejsFunction(this, 'postUser', {
      runtime: lambda.Runtime.NODEJS_14_X,
      entry: `${entryHandlerDir}/users/post-user.ts`,
      functionName: 'post-user',
      handler: 'lambdaHandler',
      ...mongoFunctionOptions,
    });

    const api = new apigateway.RestApi(this, 'ServerlessRestApi', { cloudWatchRole: false });
    api.root.addMethod('POST', new apigateway.LambdaIntegration(helloFunction));
    api.root.addResource('{id}').addMethod('GET', new apigateway.LambdaIntegration(echoFunction));

    const users = api.root.addResource('users');
    users.addResource('{username}').addMethod('GET', new apigateway.LambdaIntegration(getUserFunction));
    users.addMethod('POST', new apigateway.LambdaIntegration(postUserFunction));
  }
}
