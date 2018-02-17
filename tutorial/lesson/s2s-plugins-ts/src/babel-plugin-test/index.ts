import { PluginObj, transform } from 'babel-core';
import { NodePath } from 'babel-traverse';
import { BinaryExpression } from 'babel-types';
import PluginArgs from '../PluginArgs';

const plugin = (args: PluginArgs): PluginObj => {
  const t = args && args.types; // tslint:disable-line
  return {
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
