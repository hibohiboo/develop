#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { SampleStack } from '../lib/sample-stack';
import { bundleNpm } from '../lib/process/setup';

// pre-process
bundleNpm();

// // create app
const app = new cdk.App();
new SampleStack(app, 'SampleStack2021');
