import * as pluginTester from 'babel-plugin-tester';
import * as plugin from 'babel-plugin-s2s-action-builders';
import * as path from 'path';

const getFixturesPath = x => path.resolve(__dirname, '__fixtures__', x);

const fromWithStatePath = getFixturesPath('with-initial-state.js');

const testCases = [
  {
    title: ' basic',
    code: `
import { createAction } from 'redux-actions'
getCoinRequest
`,
  },
  {
    title: 'not run',
    code: `
import { createAction } from 'redux-actions'
let geCoinRequest
`,
  },
];

pluginTester({
  plugin,
  title: 'default',
  snapshot: true,
  tests: testCases,
});
