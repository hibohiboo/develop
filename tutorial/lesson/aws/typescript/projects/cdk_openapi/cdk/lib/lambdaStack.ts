import { Stack } from '@aws-cdk/core';
import type { Construct, StackProps } from '@aws-cdk/core';
import { OpenAPI } from 'openapi-types';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { Runtime } from '@aws-cdk/aws-lambda';
import { CfnApi, CfnStage } from '@aws-cdk/aws-apigatewayv2';
import { ServicePrincipal } from '@aws-cdk/aws-iam';
import { CfnOutput } from '@aws-cdk/core';

interface LambdaStackProps extends StackProps {
  stage: string
  openApi: OpenAPI.Document
}

interface IntegrationSetting {
  readonly type: string
  readonly httpMethod: string
  readonly uri: string
  readonly payloadFormatVersion: string
}

const entryHandlerDir = '../src/handlers';
// https://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/http-api-open-api.html
export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);
    const helloLambda = this.initHelloLambda();
    this.initOpenAPI(helloLambda, props);
  }

  initHelloLambda() {
    return new NodejsFunction(this, 'hello-sample', {
      runtime: Runtime.NODEJS_14_X,
      entry: `${entryHandlerDir}/api/hello.ts`,
      handler: 'handler',
      bundling: {
        sourceMap: true,
      },
    });
  }

  initOpenAPI(helloLambda: NodejsFunction, { openApi, stage }: LambdaStackProps) {
    const integrationSetting: IntegrationSetting = {
      type: 'AWS_PROXY',
      httpMethod: 'POST',
      uri: helloLambda.functionArn,
      payloadFormatVersion: '2.0'
    }

    // APIGatewayのOpenAPI独自拡張であるx-amazon-apigateway-integrationをここで追記
    Object.entries(openApi.paths).forEach(([path]) => {
      Object.entries(openApi.paths[path]).forEach(([method]) => {
        openApi.paths[path][method]['x-amazon-apigateway-integration'] = integrationSetting
      })
    })

    // HttpApiのコンストラクタは2021/3/13時点では、experimental のステータスのため、CfnApiコンストラクタを使用
    const api = new CfnApi(this, 'httpApi', {
      body: openApi
    })

    new CfnStage(this, `api-${stage}`, {
      apiId: api.ref,
      stageName: '$default',
      autoDeploy: true,
    })

    helloLambda.addPermission(
      'myFunctionPermission',
      {
        principal: new ServicePrincipal('apigateway.amazonaws.com'),
        action: 'lambda:InvokeFunction',
        sourceArn: `arn:aws:execute-api:${Stack.of(this).region}:${Stack.of(this).account}:${api.ref}/*/*/*`
      }
    )
    new CfnOutput(this, 'HTTP API Url', {
      value: api.attrApiEndpoint ?? 'Something went wrong with the deploy'
    })
  }
}
