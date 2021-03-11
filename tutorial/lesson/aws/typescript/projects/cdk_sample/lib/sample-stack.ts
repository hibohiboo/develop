import * as cdk from '@aws-cdk/core';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import * as lambda from '@aws-cdk/aws-lambda';

export class SampleStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new NodejsFunction(this, 'test', {
      runtime: lambda.Runtime.NODEJS_14_X,
      entry: 'src/lambda/handlers/test.ts',
      functionName: 'kotatest'
    });
    new NodejsFunction(this, 'hello', {
      runtime: lambda.Runtime.NODEJS_14_X,
      entry: 'src/lambda/handlers/hello.ts',
      functionName: 'kotahello',
      handler: 'lambdaHandler'
    });
  }
}
