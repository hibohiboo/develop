const fs = require('fs')

/**
 * Promiseを返す関数
 */
function readFile_pr (fname) {
  return new Promise((resolve) => {
    fs.readFile(fname, 'utf-8', (err, s) => {
      resolve(s)
    })
  })
}

// 順にテキストを読む
readFile_pr('public/data/a.txt')
  .then((text) => {
    console.log('aを読みました', text)
    return readFile_pr('public/data/b.txt')
  })
  .then((text) => {
    console.log('bを読みました', text)
    return readFile_pr('public/data/c.txt')
  })
  .then((text) => {
    console.log('cを読みました', text)
  })
