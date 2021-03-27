import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { entryHandlerDir } from './constants';

export class S3LambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new NodejsFunction(this, 's3-sample', {
      runtime: lambda.Runtime.NODEJS_14_X,
      entry: `${entryHandlerDir}/s3-sample.ts`,
      handler: 'lambdaHandler',
      bundling: {
        sourceMap: true,
      },
      environment: {
        IS_LOCAL_STACK: process.env.IS_LOCAL_STACK || '',
        S3_BUCKET: process.env.S3_BUCKET || ''
      }
    });


  }
}
