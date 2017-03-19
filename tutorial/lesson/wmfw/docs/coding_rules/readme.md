# javascript  コーディングルール

基本は[airbnb](http://mitsuruog.github.io/javascript-style-guide/)を利用

## 静的解析ツールの利用

./bin/eslint.shを利用し、ルールに違反しているものを探す。

./bin/fix-eslint.shを利用し、自動で修正できるものは修正する。

## eslintの独自ルール

### no-use-before-define

functionは巻き上げられるため、定義より前の文に使っても良いとする。

```json
"no-use-before-define": ["error", { "functions": false, "classes": true }]
```

### no-shadow

スコープが適切に定義されていれば問題ないため、外のスコープで定義されている変数名と被ってもよい。

```js
"no-shadow": 0
```

### モジュールのunresolvedの無視

node_modulesは別のコンテナにあるので、eslintのコンテナからは見えない。
別のコンテナでnpm installしたモジュールはソース内からインポートしないことを伝える。
eslint.rcに下記を追加。

```json
  "import/extensions": [2, { 
	  "ignore": ["express"] 
	}]
  "import/no-unresolved": [2, {
     "ignore": ["express"] 
  }],
 ```

## スタイルのルール

googleの規約から一部を使用。

### 命名規約

|        | 記法 |例|
|:--     |:--|:--|
|関数    |camelCase  |functionNamesLikeThis|
|変数    |camelCase  |variableNamesLikeThis|
|クラス  |PascalCase |ClassNamesLikeThis|
|列挙型  |PascalCase |EnumNamesLikeThis|
|メソッド|camelCase  |methodNamesLikeThis|
|定数    |~~UPPER~~ camelCase|~~CONSTANT_VALUES_LIKE_THIS~~|
|名前空間|camelCase|foo.namespaceNamesLikeThis.bar|
|ファイル|lower|filenameslikethis.js|

#### 定数

定数は`const`で宣言する。記法は変数と同じ。

#### ファイル名

大文字小文字を区別するプラットフォームで混乱が生じることを避けるため、ファイル名には小文字のみを使う。  
ファイル名は.jsで終わらねばならず、-と_以外の区切り文字を含んではならない（より好ましいのは_より-の方）。

#### プロパティとメソッド

privateなプロパティ、メソッドには末尾にアンダースコアをつける。  
protected なプロパティ、メソッドには（publicと同様に）末尾にアンダースコアをつけない。


#### メソッドと関数のパラメータ

省略可能な関数の引数は名前の先頭をopt_とする。



### importを使う。

モジュールのインポート方法に`require`と`import`とあるので、混在しないようにする。[*][*3]

### return文は早めに

if分の深いネストを避けるために、出来るだけ早く関数から値をreturnすること。
[*](http://popkirby.github.io/contents/nodeguide/style.html#return-statements)

◎
```js
    function isPercentage(val) {
      if (val < 0) {
        return false;
      }
      if (val > 100) {
        return false;
      }
      return true;
    }
```

X
``` js
    function isPercentage(val) {
      if (val < 0) {
        if (val > 100) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    }
```

この例の場合はもっと短くしてもいい。

◎
```js
    function isPercentage(val) {
      var isInRange = (val >= 0 && val <= 100);
      return isInRange;
    }
```
### 三項演算子

```js
let x = a ? b : c; // 収まるなら1行にまとめる。

// 最初のオペランドの位置までインデントするのもOK 
let z = a ? 
        moreComplicatedB : 
        moreComplicatedC;
```

### ドット

```
let x = foo.bar(). 
    doSomething(). 
    doSomethingElse();
```

## 参考

[airbnb][*1]
[node規約][*2]
[google規約][*3]

[*1]:http://mitsuruog.github.io/javascript-style-guide/
[*2]:http://popkirby.github.io/contents/nodeguide/style.html
[*4]:https://www38.atwiki.jp/aias-jsstyleguide2/pages/1.html