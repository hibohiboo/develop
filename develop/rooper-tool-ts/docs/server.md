# 開発用サーバについて

起動は`docker/bin/start.sh`、もしくは`docker/bin/up-d.sh`でバックグラウンドで起動。

## webpack-dev-server

以下にアクセスすると、開発用サーバで確認ができる。
[webpack-dev-server](http://192.168.50.10:8080/webpack-dev-server/)

設定は`docker/tools/config/webpack.config.babel.js`を参照。

## アプリケーションサーバー
以下にアクセスすると、サーバにアクセスできる。
jsは`docker/bin/webpack.sh`で作成される`dist/bundle-webpack`内のものが使われる。

[server](http://192.168.50.10/)

## 静的コンテンツサーバ

以下にアクセスすると、テストコードのカバレッジを確認できる。
`docker/bin/jest.sh`で作成される`dist/coverage-jest/`が実体。

[coverage](http://192.168.50.10/coverage/)

以下にアクセスすると、typescriptのapiを確認できる。
`docker/bin/typedoc.sh`で作成される`dist/typedoc/`が実体。

[coverage](http://192.168.50.10/typedoc/)

## 参考
[webpack-dev-server][*1]
[angular][*2]

[*1]:https://webpack.github.io/docs/webpack-dev-server.html
[*2]:https://qiita.com/ovrmrw/items/56364a4b673c03e20bba
