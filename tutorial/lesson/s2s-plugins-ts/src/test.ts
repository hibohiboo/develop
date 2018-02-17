import {transform, PluginObj} from 'babel-core';
import {NodePath} from 'babel-traverse';
import {BinaryExpression} from 'babel-types';
import  PluginArgs from './PluginArgs.d';

const src:string = process.argv.slice(2).join(' ');

/**
 * 
 * @param param0 {types:Types} tはbabel-types
 */
const plugin = ({types:t}:PluginArgs):PluginObj =>({
  visitor:{
    BinaryExpression: (nodePath: NodePath<BinaryExpression>) =>{
      if(nodePath.node.operator !== '*'){
        const newAst = t.binaryExpression('*', nodePath.node.left, nodePath.node.right);
        nodePath.replaceWith(newAst);
      }
    }
  }
});

const {code} = transform(src, {plugins: [plugin]});
console.log(code);