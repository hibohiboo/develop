#!/usr/bin/env node

import { App } from '@aws-cdk/core';
import { S3LambdaStack } from '../lib/s3-lambda-stack';
import { createLaunch } from '../lib/process/after';

const app = new App();
const stack = new S3LambdaStack(app, 'S3LambdaStack2021');
createLaunch(stack);