const fs = require('fs')

/**
 * 非同期処理の完了を待って関数の続きを呼ぶ関数
 */
function read_gfn (g, fname) {
  fs.readFile(fname, 'utf-8', (err, data) => {
    g.next(data)
  })
}

/**
 * Generator関数を定義
 */
const g = (function * () {
  const a = yield read_gfn(g, 'public/data/a.txt')
  console.log(a)
  const b = yield read_gfn(g, 'public/data/b.txt')
  console.log(b)
  const c = yield read_gfn(g, 'public/data/c.txt')
  console.log(c)
})()

g.next()
