const fs = require('fs')

// 同期的にファイルを読む
const data = fs.readFileSync('public/data/kakugen.txt', 'utf-8')
console.log(data)
// 非同期でファイルを読む
fs.readFile('public/data/kakugen.txt', 'utf-8', readHandler)

// 読み込み完了処理
function readHandler (err, data) {
  console.log(data)
}
