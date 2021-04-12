#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { SampleStack } from '../lib/sample-stack';
import { bundleNpm } from '../lib/process/setup';
import { createLaunch } from '../lib/process/after';
import { S3LambdaStack } from '../lib/s3-lambda-stack';
import { S3Stack } from '../lib/s3-stack';

// pre-process
bundleNpm();

// // create app
const app = new cdk.App();
const stack = new SampleStack(app, 'SampleStack2021');
new S3Stack(app, 'S3Stack2021');
const s3Stack = new S3LambdaStack(app, 'S3LambdaStack2021');

// デバッガで確認したいlambdaのstackを渡す
createLaunch(stack)