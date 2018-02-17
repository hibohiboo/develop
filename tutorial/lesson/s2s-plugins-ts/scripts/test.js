const {transform} = require('babel-core')
const babylon = require('babylon')
const t = require('babel-types')

const visitor = {
    VariableDeclarator: (nodePath) => {
        nodePath.get('init').replaceWith(t.numericLiteral(10))
    }
}

const plugin = {
    visitor,
}

const source = 'const a = 1'

console.log('before:')
console.log(source) // const a = 1

const {code} = transform(source, {plugins: [plugin]})
console.log('\nafter:')
console.log(code)   // const a = 10