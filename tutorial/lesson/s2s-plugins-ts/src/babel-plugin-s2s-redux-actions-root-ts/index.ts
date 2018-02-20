// https://github.com/cndlhvn/babel-plugin-s2s-redux-actions/blob/master/src/index.js
// https://github.com/akameco/babel-plugin-s2s-action-root/blob/master/src/index.js
// https://github.com/kamijin-fanta/babel-plugins/blob/master/packages/babel-plugin-s2s-action-root-ts/src/index.js

import syntaxTypeScript from '@babel/plugin-syntax-typescript';
import { PluginObj } from 'babel-core';
import { NodePath } from 'babel-traverse';
import { Program } from 'babel-types';
import * as globby from 'globby';
import PluginArgs from '../PluginArgs';
import { getImportPath } from '../s2s-utils-ts';

export default (babel: PluginArgs): PluginObj => {
  if (babel === undefined) { return { visitor:{} }; }
  const { types:t } = babel;
  const defaultExport = (source) => t.exportAllDeclaration(t.stringLiteral(source));

  return {
    name: 's2s-redux-actions-root-ts',
    inherits: syntaxTypeScript,
    visitor: {
      Program: {
        exit(path: NodePath<Program>, state) {
	        const { input, output } = state.opts;
          if (!input) {
            throw new Error('require input option');
          }

          if (!output) {
            throw new Error('require output option');
          }

          const files = globby.sync(input);
          const index = files.indexOf(output);

          if (index > -1) {
            files.splice(index, 1);
          }

          const imports = files.map(f => defaultExport(getImportPath(output, f)));

          path.node.body = [
            ...imports,
          ];
        },
      },
    },
  };
};
