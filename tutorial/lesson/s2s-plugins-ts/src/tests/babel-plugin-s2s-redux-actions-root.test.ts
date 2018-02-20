import * as pluginTester from 'babel-plugin-tester';
import * as plugin from 'babel-plugin-s2s-redux-actions-root';
import * as path from 'path';


const cwd = path.resolve(__dirname, '.')
const filename = path.resolve(cwd, '__fixtures__', 'app', 'actions', 'action.ts')
const output = path.resolve(cwd, 'action.ts')


pluginTester({
  plugin,
  snapshot: true,
  babelOptions: { filename },
  pluginOptions: {
    input: '__fixtures__/**/action.ts',
    output,
    globOptions: { cwd },
  },
  tests: [
    // {
    //   title: 'parse',
    //   code: `
    //   import { createAction } from "redux-actions";
    //   getCommonRequest
    //   `,
    // },
    {
      title: 'no parse',
      code: `
      import { createAction } from "redux-actions";

      export const getCommentRequest = createAction("GET_COMMENT_REQUEST");
      export const getCommentSuccess = createAction("GET_COMMENT_SUCCESS");
      export const getCommentFailure = createAction("GET_COMMENT_FAILURE");
      `,
    },
  ],
})