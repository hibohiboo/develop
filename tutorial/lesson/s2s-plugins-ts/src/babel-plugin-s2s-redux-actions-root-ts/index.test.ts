import * as path from 'path'
import * as pluginTester from 'babel-plugin-tester';
import { default as plugin } from '.';

const cwd = __dirname;//process.cwd()
const filename = path.resolve(cwd, '__fixtures__', 'src', 'actions', 'coin.ts')
const output = path.resolve(cwd, 'src', 'actions', 'index.ts')

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: { filename },
  pluginOptions: { input: `${__dirname}/__fixtures__/**/*.ts`, output },
  tests: [
    {
      title: 'options',
      code: `import { createAction } from 'redux-actions';`,
    },
  ],
})