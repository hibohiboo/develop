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
[TypeScript再入門覚書 ① Atom環境構築編][*2]
[末尾カンマがes6から許可][*3]
[quotemarkの設定について][*4]

[*1]:https://github.com/palantir/tslint#usage
[*2]:http://qiita.com/junkjunctions/items/5938a6d706548cd91218
[*3]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Trailing_commas
[*4]:https://palantir.github.io/tslint/rules/quotemark/