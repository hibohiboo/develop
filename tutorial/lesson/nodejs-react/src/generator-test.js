/**
 * Generator関数定義
 */
function * counter () {
  yield 1
  yield 2
  yield 3
}

// Generatorオブジェクト作成
const g = counter()

// next()メソッドを呼ぶ
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next())
