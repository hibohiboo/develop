# nodejsとReactアプリケーション

## babel

トランスパイルツール。

### オプション

#### -w, --watch

更新を認識してトランスパイルを実行する

dockerで使用するときは、通常ではフォルダの更新を認識できないため、
環境変数`CHOKIDAR_USEPOLLING=true`を設定する。

#### --compact-true

余分な改行やコメントを削除する。

## 参考

[共有設定でらくらく ESLint][*1]

[*1]:http://qiita.com/mysticatea/items/dc35ced6bd5e782f50cd