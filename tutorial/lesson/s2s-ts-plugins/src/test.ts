import {transform} from 'babel-core';
import {NodePath} from 'babel-traverse';

const src:string = ` 1 + 2 `;

const plugin = ({types:t}) =>({
  visitor:{
    BinaryExpression: (nodePath: NodePath) =>{
      if(nodePath.node.operator !== '*'){
        const newAst = t.binaryExpression('*', nodePath.node.left, nodePath.node.right);
        nodePath.replaceWith(newAst);
      }
    }
  }
});

const {code} = transform(src, {plugins: [plugin]});
console.log(code);