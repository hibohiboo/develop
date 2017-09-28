# コーディング規約

## 基本ルール
基本は[airbnb](http://mitsuruog.github.io/javascript-style-guide/)を利用


## 静的解析ツールの利用

tslintを使用

`./docker/bin/tslint.sh`を利用し、ルールに違反しているものを探す。

`./docker/bin/tslint.sh --fix`のように`--fix`オプションをつけると、自動で修正できるものを修正してくれる。

## スタイルのルール

googleの規約から一部を使用。

### 命名規約

1. Use PascalCase for type names.
1. Use PascalCase for enum values.
1. Use camelCase for function names.
1. Use camelCase for property names and local variables.
1. Do not use "_" as a prefix for private properties.
1. Use whole words in names when possible.

### モジュールのインポートは基本的にimportを使う。

モジュールのインポート方法に`require`と`import`とあるので、混在しないようにする。[*][*3]

### エクスポートするモジュール名とファイル名をあわせる

[命名規約](.namingConventio.md)を参照。

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
[ESLint 最初の一歩][*4]  
[Microsoft Typescript][*5]
[TypeScriptのインターフェースに「I」のプリフィクスを付けるのはよくないのか][*6]

[*1]:http://mitsuruog.github.io/javascript-style-guide/
[*2]:http://popkirby.github.io/contents/nodeguide/style.html
[*3]:https://www38.atwiki.jp/aias-jsstyleguide2/pages/1.html
[*4]:http://qiita.com/mysticatea/items/f523dab04a25f617c87d)
[*5]:https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines
[*6]:https://saku.io/use-i-as-interface-prefix-in-typescript/
