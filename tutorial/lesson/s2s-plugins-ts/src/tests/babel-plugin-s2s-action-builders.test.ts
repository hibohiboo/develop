import * as path from 'path'
import * as pluginTester from 'babel-plugin-tester'
import * as plugin from 'babel-plugin-s2s-action-builders'

const getFixturesPath = x => path.resolve(__dirname, '__fixtures__', x);

const fromWithStatePath = getFixturesPath('with-initial-state.js')

const testCases = [
  {
    title: 'basic',
    code: `
import { createAction } from 'redux-actions'
getCoinRequest
`,
  },
]

pluginTester({
  title: 'default',
  plugin,
  snapshot: true,
  tests: testCases,
})

