import * as path from 'path'
import * as pluginTester from 'babel-plugin-tester'
import {default as plugin} from 'babel-plugin-s2s-reducer-test-case'

const getFixturesPath = x => path.resolve(__dirname, '__fixtures__', x)
const fromPath = getFixturesPath('reducer.ts')
const fromWithStatePath = getFixturesPath('with-initial-state.ts')

const testCases = [
  {
    title: 'basic',
    code: `
import reducer, {initialState} from './actions'
    `,
  },
  {
    title: 'exist test case',
    code: `
import reducer, {initialState} from './actions'
import * as actions from './actions'
test('handle INCREMENT', () => {
  expect(actions.sample()).toEqual(null)
})
    `,
  },
]

pluginTester({
  title: 'default',
  plugin,
  snapshot: true,
  pluginOptions: { from: fromPath },
  tests: testCases,
})

pluginTester({
  title: 'with initial state',
  plugin,
  snapshot: true,
  pluginOptions: { from: fromWithStatePath },
  tests: testCases,
})

pluginTester({
  plugin,
  tests: [
    {
      title: 'throw error',
      code: `// throw error`,
      error: /required from option/,
    },
  ],
})