/**
 * フィボナッチ数を列挙するGenerator関数定義
 */
function * genFibonacci () {
  let a = 0
  let b = 1
  while (true) {
    [a, b] = [b, a + b]
    yield a
  }
}

// Generatorオブジェクト作成
const fib = genFibonacci()

// next()メソッドを呼ぶ
for (const num of fib) {
  if (num > 50) break
  console.log(num)
}
