# 開発用環境

色々とチュートリアルを試すことができるような環境を作成する

## 基本ルール

* 行ったことについてドキュメントと参考にしたサイトを残すこと

## フォルダ構成

```
VagrantDevelop
  L docs … ドキュメント用フォルダ
    L devtool … 開発用ツールのドキュメント
    L coding-standard … コード規約。markdownの記法についてもこちらを参照。
    L provision  … 仮想環境の構築について。vagrant, ansibleについてはこちら参照。
  L devtools … 開発用ツール
  L provision … 開発環境の準備・設定
  L tutorial … チュートリアルを試すフォルダ
    L vendor … gitの管理外。gitで配布されているチュートリアルをDLして試す
    L lesson … 実際に自分で作成してみるフォルダ。
  L Vagrantfile … 仮想環境のvagrantfile
  L .vagrant … 仮想環境の実体ファイル。git管理外
  L .gitignore … gitの管理から無視するファイルを記述したファイル

```

## ドキュメントを書くときのルール

* ドキュメントは[マークダウン記法](./coding-standard/markdown/markdown.md)で作成すること
* 参考にしたサイトをファイルの末尾に追加すること
  * 参考にした部分に[*n]のようにリンクを貼ること

```参考サイトの例
## 文章を書くときに気をつけること

読み手の気持ちになって考える事。[*1][*1]

## 参考 

[リーダブルコード要約とリーダブルコード要約の活用方法][*1]

[*1]:http://qiita.com/AKB428/items/20e81ccc8d9998b5535d
```

## 文章のフォーマット

### ショートカットキー記載

キーは[]で囲む
* ex) [p] … Pキー

| キー   | 意味        |
|:-----  |:----        |
| [win]  | windowsキー |
| [ctrl] | controlキー |
| [shft] | shiftキー   |
| [esc]  | escapeキー  |
| [alt]  | altキー     |
| [space]| 空白キー    |

連続で入力[:][e]

押しながら[ctrl]+[v]

### 用語ルール

| 文字   | 意味            |
|:-----  |:----            |
| n      | 整数(number)    |
| x      | 数字(小数点可)  |
| hoge*  | prefixにhogeとつけた場合は任意の文字列。(ファイルならhogefileなど) [*1][*1]  |
| huga   | 任意文字列2つめ |
| piyo   | 任意文字列3つめ |       
| foo    | 任意変数名[*1][*1] |
| bar    | 任意変数名2つめ    | 

# cheatsheetルール

* 使ったコマンドがdocsにまだ記載されていなければ記載すること
* コマンドについてのメモはsheet.mdに記載
  * 目的からコマンドを探した場合は逆引きとしてreverse.mdに記載
* bashコマンドの例の場合は先頭に $ をつけた後にコマンドを書く

```bash
$ ls
```


## 参考

[メタ構文文字列][*1]
[documentation](./dist/docs/html/index.html)

[*1]:https://ja.wikipedia.org/wiki/%E3%83%A1%E3%82%BF%E6%A7%8B%E6%96%87%E5%A4%89%E6%95%B0

