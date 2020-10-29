#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ProjectsStack } from '../lib/projects-stack';

const app = new cdk.App();
new ProjectsStack(app, 'ProjectsStack');
