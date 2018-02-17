import {transform, PluginObj} from 'babel-core';
import {NodePath} from 'babel-traverse';
import {BinaryExpression} from 'babel-types';
import  * as t from 'babel-types';

/**
 * 
 * @param param0 {types:Types} tはbabel-types
 */
const plugin = () =>({
  visitor:{
    BinaryExpression: (nodePath: NodePath<BinaryExpression>) =>{
      if(nodePath.node.operator !== '*'){
        const newAst = t.binaryExpression('*', nodePath.node.left, nodePath.node.right);
        nodePath.replaceWith(newAst);
      }
    }
  }
});

export default plugin;