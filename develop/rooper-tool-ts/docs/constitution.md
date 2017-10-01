# ディレクトリ構成

```yml
rooper-tool
  - docker-compose.yml     # コンテナ管理ファイル
  - docs                   # ドキュメント類
    - constitution.md      # ディレクトリ構成について
    - linting.md           # 構文チェックについて
    - server.md            # サーバについて
    - tests.md             # テストについて
    - typescript.md        # TypeScriptについて
    - webpack.md           # ビルドツールについて
  
  - app                    # シナリオ作成ページ
    - docker               # コンテナ関連ファイルまとめ 
      + bin                # dockerコンテナの起動シェル。後述する。
      - server 
        - nginx              # アプリケーションサーバ
        - proxy              # プロキシサーバ
      - tools                # 開発用ツール
        + bin                # 実行用のシェルファイル
        - core               # 基本画面用ツール
          + bin              # 実行用のシェルファイル
          - config             # 設定
            - .eslintrc        # 
            - .babelrc         # 
            - global_path.js   # e2eテストの接続先URL設定
            - nightwatch.conf.js # e2eテストの設定
            - tsconfig.json    # typescriptの設定
            - tslint.json      # tslintの設定
            - webpack.config.bable.js # webpackの設定
          + e2e                # end to end(e2e) テスト。
          + babel              # トランスパイラ
          + jest               # 単体テスト
          + tslint             # 構文チェック
          + typescript         # Typescript
          - docker-compose.yml
        - plugins
          - react              # react用プラグインビルドツール
            + bin              # 実行用のシェルファイル
            + webpack
            - docker-compose.yml
        + pandoc             # markdownをhtmlに変換
        - aws-cli            # aws関連
          + .aws             # awsのユーザ情報（非公開）
          - Dockerfile       # awscliツールのコンテナ情報
          - conf
            + s3           # s3bucketの設定
        - docker-compose.yml
      - docker-compose.yml
    - tests
      - e2e
        - tests.js         # e2eテストコード
    - src                  # ソースコード
      - browser            # クライアント側
        + core             # 基本画面
        - plugins          # 追加画面
          - ScenarioMaker  # シナリオ作成画面
            + react        # pc向け reactで作成
            + mithril      # スマホ向け
    + public               # 静的ファイル置き場
    + dist                 # 出力結果
```

## shell

```yml
    - bin
      - babel.sh           # （学習用）es6をブラウザ向けにトランスパイルする。dist/transpiled-tsc/*をdist/transpiled-babel/*に出力。
      - bash.sh            # コンテナのbash起動。`bash.sh hoge`でhogeコンテナのbashに入る。
      - config_profile.sh  # awsのconfigを設定
      - container_build.sh # コンテナの作成。Dockerfileを編集したら行うこと。
      - deploy.sh          # awsにデプロイ
      - e2e.sh             # e2eテストを行う。start.shやup-d.shを行い、開発サーバが動いていることが条件。tests/e2e/test.js
      - eslint.sh          # jsの構文チェックを行う。 --fixオプションで自動修正。
      - jest.sh            # ユニットテストを行う。.test.tsのファイルが対象。
      - pandoc.sh          # docsディレクトリのmarkdownファイルをdist/pandocにhtmlファイルにして出力
      - remove_all_container.sh # コンテナを削除
      - sspa               # awsのスクリプト
      - start.sh           # dockerの起動。開発サーバの起動。
      - tools-bash.sh      # docker/tools/docker-compose.yml に記述されているコンテナのbashに入る。
      - tsc.sh             # （学習用）typescriptをes6にトランスパイルする。src/*.tsをdist/transpiled-tsc/*.jsに出力
      - tslint.sh          # tsの構文チェックを行う。--fixオプションで自動修正。
      - typedoc.sh         # tsのapiドキュメントを作成する。
      - up-d.sh            # バックグラウンドでdockerを起動。
      - webpack.sh         # dist/bundle-webpackにトランスパイルとminifyを行ったファイルとソースマップを出力する。
```

## 参考

[nginx設定ファイル格納先][*1]  
[alias][*2]  
[nginx + virtualbox 更新されない][*3]  

[*1]:http://gakumon.tech/nginx/nginx_conf_directory.html
[*2]:https://heartbeats.jp/hbblog/2012/04/nginx05.html
[*3]:https://teratail.com/questions/93553
