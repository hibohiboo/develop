# 静的解析ツール eslint

## 実行

実行コマンドを記述したシェルファイルを用意している。

|ファイル名| 説明|
|:--     |:--|
|bin/eslint.sh|ルールのチェック|
|bin/eslint.sh|ツールによるコードの修正|

## config/eslint.jsonの解説

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