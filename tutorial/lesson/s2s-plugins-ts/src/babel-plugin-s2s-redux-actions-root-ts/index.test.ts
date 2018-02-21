import * as pluginTester from 'babel-plugin-tester';
import * as path from 'path';
import { default as plugin } from '.';

const cwd = __dirname;

// index.tsが作成されることを確認
const output = path.resolve(cwd, 'src', 'actions', 'index.ts');
const input = `${__dirname}/__fixtures__/**/*.ts`;

// コードがあるとき
pluginTester({
  plugin,
  snapshot: true,
  pluginOptions: { input, output },
  tests: [
    {
      title: 'index.tsが作成されて、内容が正しいこと',
      code: `empty`,
    },
  ],
});

pluginTester({
  plugin,
  tests: [
    {
      title: 'error',
      code: `// throw error`,
      error: /require input option/,
    },
  ],
});

pluginTester({
  plugin,
  pluginOptions: { input: 'src/__fixtures__/**/*.js' },
  tests: [
    {
      title: 'error',
      code: `// throw error`,
      error: /require output option/,
    },
  ],
});
