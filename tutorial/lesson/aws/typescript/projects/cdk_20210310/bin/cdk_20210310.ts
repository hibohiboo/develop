#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Cdk20210310Stack } from '../lib/cdk_20210310-stack';

const app = new cdk.App();
new Cdk20210310Stack(app, 'Cdk20210310Stack');
