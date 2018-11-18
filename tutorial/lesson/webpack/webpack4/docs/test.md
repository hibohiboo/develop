# テスト

## 外部ファイルを外に用意して、typescriptで読み込み

### コンパイラに無視させる

```
  // @ts-ignore:
  const app = Elm.Main.init({node: mountNode});
```

[この時点のソース](https://github.com/hibohiboo/develop/tree/baddbd7e1d19dc59aa1d4c568b6b76ead6ba8703/tutorial/lesson/webpack/webpack4)  
