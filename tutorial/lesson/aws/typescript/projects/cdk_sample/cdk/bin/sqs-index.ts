#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { SampleStack } from '../lib/sample-stack';
import { bundleNpm } from '../lib/process/setup';
import { createLaunch } from '../lib/process/after';
import { S3LambdaStack } from '../lib/s3-lambda-stack';
import { S3Stack } from '../lib/s3-stack';
import { SQSStack } from '../lib/sqs-stack'

// // create app
const app = new cdk.App();

new SQSStack(app, 'SQSStack')
