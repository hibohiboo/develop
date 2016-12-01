# redux todo

## ディレクトリ構成

```yml
redux-todo
  - bin # docker-composeの操作をシェル化
    - start.sh # 開発サーバの起動
    - build.sh # dist内にjsファイルをビルド
    - bash.sh  # コンテナ内にログイン
    - container_build.sh # コンテナの再作成
    - remove_all_container.sh # 全てのコンテナの削除
  - public # 開発サーバのベースとなるフォルダ
    - index.html # 開発サーバのホーム。
  - src
    - app.js     # エントリーポイント
    - components # Reactコンポーネント
      - App.js
  - webpack # ビルドツール
    - Dockerfile              # コンテナの環境設定ファイル
    - package.json            # コンテナ内にコピーされるnpm設定ファイル
    - webpack.config.babel.js # ビルドツールの設定
    - .babelrc                # ビルドツールで利用するトランスパイラの設定
  + dist   # ビルドされたファイルの格納先
  - docker-compose.yml # コンテナ起動時設定ファイル
```

## 参考

[Redux ExampleのTodo Listをはじめからていねいに][*1]

[*1]:http://qiita.com/xkumiyu/items/9dfe51d2bcb3bdb06da3