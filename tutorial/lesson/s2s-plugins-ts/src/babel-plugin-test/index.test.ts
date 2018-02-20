import * as pluginTester from 'babel-plugin-tester';
import { default as plugin } from '.';

pluginTester({
  plugin,
  tests: [
    {
      title: 'snapshot test',
      code: `var a = 1 + 1`,
      snapshot: true,
    },
    {
      title: 'no change',
      code: `var a = 1 * 1;`,
      output: `var a = 1 * 1;`,
    },
  ],
});
