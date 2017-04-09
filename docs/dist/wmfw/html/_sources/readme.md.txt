# WhiteMapFrameWorkドキュメントについて

## 使用するツール

基本的なドキュメントの作成にはsphinx。
APIドキュメントにはjsdocを使用する

## ドキュメントの書き方

* 基本的にマークダウン記法。
* contentsディレクトリ以下に、項目ごとにディレクトリを作成する。
  * 各ディレクトリには目次としてindex.rstファイルを置く。
* docs/index.rstファイルから各ディレクトリのindex.rstへのリンクを貼る
* 各ファイルの末尾には参考にしたホームページへのリンクを貼る。

## sphinx + recommonmarkで使用できるルール

### 数学記号

```math
E = m c^2
```

## 参考

[sphinx - 日本ユーザ会][*1]
[recommonmark][*2]

[*1]:http://sphinx-users.jp/index.html
[*2]:https://github.com/rtfd/recommonmark