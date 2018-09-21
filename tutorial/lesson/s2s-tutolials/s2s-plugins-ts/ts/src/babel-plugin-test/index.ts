import { PluginObj } from 'babel-core';
import { NodePath } from 'babel-traverse';
import { BinaryExpression } from 'babel-types';
import PluginArgs from '../PluginArgs';

const plugin = (args: PluginArgs): PluginObj => {
  if (args === undefined) { return { visitor:{} }; }
  const { types:t } = args;
  return {
    name: 'test',
    visitor:{
      BinaryExpression: (nodePath: NodePath<BinaryExpression>) => {
        if (nodePath.node.operator !== '*') {
          const newAst = t.binaryExpression('*', nodePath.node.left, nodePath.node.right);
          nodePath.replaceWith(newAst);
        }
      },
    },
  };
};

export default plugin;
