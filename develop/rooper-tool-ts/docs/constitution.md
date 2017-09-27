# ディレクトリ構成

```yml
rooper-tool
  - docker-compose.yml     # コンテナ管理ファイル
  - docs                   # ドキュメント類
    - constitution.md      # ディレクトリ構成について
    - linting.md           # 構文チェックについて
    - server.md            # サーバについて
    - tests.md             # テストについて
    - typescript           # TypeScriptについて
  - scenario-maker         # シナリオ作成ページ
    - docker               # コンテナ関連ファイルまとめ 
      - bin
        - bash.sh            # コンテナのbash起動
        - config_profile.sh  # awsのconfigを設定
        - container_build.sh # コンテナの作成
        - deploy.sh          # awsにデプロイ
        - sspa               # awsのスクリプト
        - start.sh           # dockerの起動
      - server 
        - nginx              # アプリケーションサーバ
        - proxy              # プロキシサーバ
      - tools                # 開発用ツール
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
        - aws-cli            # aws関連
          + .aws             # awsのユーザ情報（非公開）
          - Dockerfile       # awscliツールのコンテナ情報
          - conf
            + s3           # s3bucketの設定
    - tests
      - e2e
        - tests.js         # e2eテストコード
    + dist                 # 出力結果
    
```

## 参考

[nginx設定ファイル格納先](http://gakumon.tech/nginx/nginx_conf_directory.html)
[alias](https://heartbeats.jp/hbblog/2012/04/nginx05.html)
[nginx + virtualbox 更新されない](https://teratail.com/questions/93553)