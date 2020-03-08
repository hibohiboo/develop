## カスケーディングの優先順位
1. 重要度
2. 詳細度
3. コードの順序

## 詳細度の優先順位
1. IDセレクター
2. クラスセレクター・属性セレクター・疑似クラス
3. 要素型セレクター


[参考：specificity calculator](https://specificity.keegan.st/)

### ※値は繰り上がらない
一つの要素にID１つ、classを10個指定したとしても、優先度はIDセレクタで指示されたもののほうが高い。
* 以下のように、同じ優先度内での順位が増減するイメージ
  * 1.0
  * 2.10
  * 3.0


## CSS設計の8つのポイント

1. 特性に応じてCSSを分類する
2. コンテンツとスタイリングが疎結合である
3. 影響範囲がみだりに広すぎない
4. 特定のコンテキストにみだりに依存していない
5. 詳細度がみだりに高くない
6. クラス名から影響範囲が想像できる
7. クラス名から見た目・機能・役割が想像できる
8. 拡張しやすい



## コードサンプル

[CSS設計完全ガイド サンプルデータサイト](https://css-architecture-perfect.guide/)

## 役立ちページ

[css stats](https://cssstats.com/stats/)

## 参考

[storybook for htmlがあまりにも使いづらいのでpugを使って上手く利用する方法を考えてみた](https://qiita.com/BigFly3/items/1e9bf8c0a3f786556bb7)
[静的なWEBサイト用にも使えるstorybookのpug環境を作ってみた](https://qiita.com/BigFly3/items/81b2a7c75c143b63ebde)
[上記サイトの参考githubリポジトリ](https://github.com/BigFly3/storybook_html_pugdev)
[Storybook for HTML](https://storybook.js.org/docs/guides/guide-html/)
[highlignt.js](https://tr.you84815.space/hljs/api/get-language.html)
[copy-code-block](https://github.com/Pickra/copy-code-block)