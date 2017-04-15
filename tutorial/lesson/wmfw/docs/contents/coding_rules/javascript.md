# javascript  コーディングルール

基本は[airbnb](http://mitsuruog.github.io/javascript-style-guide/)を利用

## 静的解析ツールの利用

./bin/eslint.shを利用し、ルールに違反しているものを探す。

./bin/fix-eslint.shを利用し、自動で修正できるものは修正する。

詳細は[eslintの定義について](./eslint.md)を参照。

## スタイルのルール

googleの規約から一部を使用。

### 命名規約

[命名規則](.namingConventio.md)を参照。

#### 定数

定数は`const`で宣言する。記法は変数と同じ。

#### ファイル名


#### プロパティとメソッド

privateなプロパティ、メソッドには末尾にアンダースコアをつける。  
protected なプロパティ、メソッドには（publicと同様に）末尾にアンダースコアをつけない。


#### メソッドと関数のパラメータ

省略可能な関数の引数は名前の先頭をopt_とする。

### モジュールのインポートは基本的にimportを使う。

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