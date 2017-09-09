const fs = require('fs')

// node7以上でサポート

/**
 * Promiseで非同期でファイルを読み込む関数
 */
function readFileEx (fname) {
  return new Promise((resolve, reject) => {
    fs.readFile(fname, 'utf-8', (err, data) => {
      resolve(data)
    })
  })
}

/**
 * すべてのファイルを逐次読み込むasync関数を定義
 */
async function readAll () {
  const a = await readFileEx('public/data/a.txt')
  console.log(a)
  const b = await readFileEx('public/data/b.txt')
  console.log(b)
  const c = await readFileEx('public/data/c.txt')
  console.log(c)
}
readAll()
