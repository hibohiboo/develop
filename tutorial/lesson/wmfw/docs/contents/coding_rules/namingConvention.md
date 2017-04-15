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

#### 定数

定数は`const`で宣言する。記法は変数と同じ。 
明示的に定数と示したいときは全て大文字、単語のつなぎ目はアンダースコアで行う。

#### プロパティとメソッド

privateなプロパティ、メソッドには末尾にアンダースコアをつける。  
protected なプロパティ、メソッドには（publicと同様に）末尾にアンダースコアをつけない。


#### メソッドと関数のパラメータ

省略可能な関数の引数は名前の先頭をopt_とする。

## ファイル名について

大文字小文字を区別するプラットフォームで混乱が生じることを避けるため、ファイル名には小文字のみを使う。
ファイル名は.jsで終わらねばならず、-以外の区切り文字を含んではならない。

|        | 記法 |例|
|:--     |:--|:--|
|ファイル|lower|filenames-like-this-bk.js|

### ケバブケースを使用

ファイル名を見れば内容が分かるように、
出力するモジュール名をキャメルケースからケバブケースに置き換えたものをファイル名とする。

test-case.js
```js
export defaunt testCase;
```

