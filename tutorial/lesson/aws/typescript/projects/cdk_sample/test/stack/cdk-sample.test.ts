import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { SampleStack } from '../../lib/sample-stack';

test('Empty Stack', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new SampleStack(app, 'SampleStack2021');
  // THEN
  // expectCDK(stack).to(matchTemplate({
  //   "Resources": {}
  // }, MatchStyle.EXACT))
});
