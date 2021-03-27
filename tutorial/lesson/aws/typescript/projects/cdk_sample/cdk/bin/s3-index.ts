#!/usr/bin/env node

import { App } from '@aws-cdk/core';
import { S3Stack } from '../lib/s3-stack';

const app = new App();
new S3Stack(app, 'S3Stack2021');
