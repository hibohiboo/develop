#!/usr/bin/env node
import 'source-map-support/register';
import { App } from '@aws-cdk/core';
import { LambdaStack } from '../lib/lambdaStack';
import SwaggerParser from "@apidevtools/swagger-parser";
import { OpenAPI } from 'openapi-types';
const {
  STAGE = 'dev'
} = process.env

// https://serverless.co.jp/blog/347/
async function createApp(): Promise<App> {
  const openApi: OpenAPI.Document = await SwaggerParser.dereference('../openapi/openapi.json')

  // create app
  const app = new App();

  new LambdaStack(app, `LambdaStack-${STAGE}`, {
    stage: STAGE,
    openApi: openApi,
  })

  return app
}
createApp()