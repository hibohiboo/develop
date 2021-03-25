#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { SampleStack } from '../lib/sample-stack';
import { bundleNpm } from '../lib/process/setup';
import { createLaunch } from '../lib/process/after';

// pre-process
bundleNpm();

// // create app
const app = new cdk.App();
const stack = new SampleStack(app, 'SampleStack2021');
createLaunch(stack)