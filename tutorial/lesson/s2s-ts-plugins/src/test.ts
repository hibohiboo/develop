import {transform, PluginObj} from 'babel-core';
import {NodePath} from 'babel-traverse';
import {BinaryExpression} from 'babel-types';
import * as BabelTypes from 'babel-types';

/** 
 * tにはbabel-typesが入ってくる。上手い補完方法が思いつかない。 
 */
class Types {
  binaryExpression = BabelTypes.binaryExpression
}
interface ITypes{types:Types}

const src:string = ` 1 + 2 `;

const plugin = ({types:t}:ITypes):PluginObj =>({
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