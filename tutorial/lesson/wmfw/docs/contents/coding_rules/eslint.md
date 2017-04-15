# 静的解析ツール eslint

## 実行

実行コマンドを記述したシェルファイルを用意している。

|ファイル名| 説明|
|:--     |:--|
|bin/eslint.sh|ルールのチェック|
|bin/eslint.sh|ツールによるコードの修正|

## config/eslint.jsonの解説

### 基本ルールはaribnb

```json
{
    "extends": "airbnb",
}
```

### バージョン

```json
    "env": {
        "commonjs": true,
        "es6": true
    },
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true
        },
        "sourceType": "module"
    }
```

### no-use-before-define

functionは巻き上げられるため、定義より前の文に使っても良いとする。

```json
"no-use-before-define": ["error", { "functions": false, "classes": true }]
```

### no-shadow

スコープが適切に定義されていれば問題ないため、外のスコープで定義されている変数名と被ってもよい。

```json
"no-shadow": 0
```

### モジュールのunresolvedの無視

node_modulesは別のコンテナにあるので、eslintのコンテナからは見えない。
別のコンテナでnpm installしたモジュールはソース内からインポートしないことを伝える。

eslint.rc
```json
  "import/extensions": [2, { 
	  "ignore": ["express"] 
	}]
  "import/no-unresolved": [2, {
     "ignore": ["express"] 
  }],
 ```

 ###  no-multi-spacesの例外

可読性を上げるためのスペースの挿入は許可する。

```js
 // コントローラクラスのインポート
import home         from '../controllers/home-controller';
import hello        from '../controllers/hello-world-controller';
import moviesRouter from '../controllers/movies-controller';
```

```json
  "no-multi-spaces": 0,
```

### jsdocの作成

可能な限りjsdocは記述する。

[jsdocについて](./jsdoc.md)も参照。

```json
  "require-jsdoc":1,
  "valid-jsdoc":1,
```

### ファイル名の指定

小文字で記述し、単語のつなぎ目は`-`を使用する`kebab`ルールを使用する。

```json
  "filenames/match-regex": [2, "^[a-z-][a-z0-9-]+$", true],
  "filenames/match-exported": [2, [ null, "kebab" ] ]
```

### ファイル名とモジュール名の一致

モジュールのファイル名は、出力するモジュール名をキャメルケースからケバブケースに置き換えたものとする。

```json
  "filenames/match-exported": [2, [ null, "kebab" ] ]
```

 ## 参考

[.eslintを晒す][*1]

 [*1]:http://qiita.com/armorik83/items/861e8b883ea5893a3320
