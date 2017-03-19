# javascript  コーディングルール

基本は[airbnb](./aribnb.md)を利用

## 静的解析ツールの利用

./bin/eslint.shを利用し、ルールに違反しているものを探す。

./bin/fix-eslint.shを利用し、自動で修正できるものは修正する。

## モジュールのunresolvedの無視

eslint.rcに下記を追加。
npm installしたモジュールはソース内からインポートしないことを伝える。

```json
  "import/no-unresolved": [2, { 
	  "ignore": ["express"] 
	}]
 ```

