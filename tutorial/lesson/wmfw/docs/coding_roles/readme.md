# javascript  コーディングルール

基本は[airbnb](http://mitsuruog.github.io/javascript-style-guide/)を利用

## 静的解析ツールの利用

./bin/eslint.shを利用し、ルールに違反しているものを探す。

./bin/fix-eslint.shを利用し、自動で修正できるものは修正する。

## 独自ルール

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
  "import/no-unresolved": [2, { 
	  "ignore": ["express"] 
	}]
 ```

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


## 参考



[*1]:http://mitsuruog.github.io/javascript-style-guide/
[*2]:http://popkirby.github.io/contents/nodeguide/style.html