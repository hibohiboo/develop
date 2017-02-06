# tslint

## 実行

対象ファイルを以下のように指定

```
tslint -c tslint.json 'src/**/*.ts', 'src/**/*.tsx'
```

## 洗い出したエラーを修正

fixオプションをつけることで、`tslint`で表示されたエラーを修正できる

```
tslint --fix -c tslint.json 'src/**/*.ts', 'src/**/*.tsx'
```

[tslint][*1]

[*1]:https://github.com/palantir/tslint#usage