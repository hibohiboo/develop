# 命名規則


## javascript命名規則

|        | 記法 |例|
|:--     |:--|:--|
|関数    |camelCase  |functionNamesLikeThis|
|変数    |camelCase  |variableNamesLikeThis|
|クラス  |PascalCase |ClassNamesLikeThis|
|列挙型  |PascalCase |EnumNamesLikeThis|
|メソッド|camelCase  |methodNamesLikeThis|
|定数    |~~UPPER~~ camelCase|~~CONSTANT_VALUES_LIKE_THIS~~|
|名前空間|camelCase|foo.namespaceNamesLikeThis.bar|

## ファイル名について

大文字小文字を区別するプラットフォームで混乱が生じることを避けるため、ファイル名には小文字のみを使う。
ファイル名は.jsで終わらねばならず、-と_以外の区切り文字を含んではならない（より好ましいのは_より-の方）。

|        | 記法 |例|
|:--     |:--|:--|
|ファイル|lower|filenames-like-this-bk.js|



### キャメルケースを基本的に利用

基本的にキャメルケースを使用する

### 追加は`-`で連結

日付を入れるなど、付属情報をつけるときは`-`を使用する。[*](http://hayakuyuke.jp/archives/16958)

