import plugin from '.';
import * as pluginTester from 'babel-plugin-tester';

pluginTester({
  plugin,
  tests: [
    {
      title: 'snapshot test',
      code: `var a = 1 + 1`,
      snapshot: true
    },
    {
      title: 'no change',
      code: `var a = 1 * 1;`,
      output: `var a = 1 * 1;`,
    },
  ],
});