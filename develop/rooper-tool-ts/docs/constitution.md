# ディレクトリ構成

```yml
rooper-tool
  - docker-compose.yml     # コンテナ管理ファイル
  - docs                   # ドキュメント類
    - constitution.md      # ディレクトリ構成について
  - scenario-maker         # シナリオ作成ページ
    - docker               # コンテナ関連ファイルまとめ 
      - bin
        - bash.sh            # コンテナのbash起動
        - config_profile.sh  # awsのconfigを設定
        - container_build.sh # コンテナの作成
        - deploy.sh          # awsにデプロイ
        - sspa               # awsのスクリプト
        - start.sh           # dockerの起動
      - tools                # 開発用ツール
        - config             # 設定
          - .eslintrc        # 
          - .babelrc         # 
          - global_path.js   # e2eテストの接続先URL設定
          - nightwatch.conf.js # e2eテストの設定
        + e2e                # end to end(e2e) テスト。
        + babel              # トランスパイラ
        + jasmine            # 単体テスト
        + lint               # 構文チェック
        - aws-cli            # aws関連
          + .aws             # awsのユーザ情報（非公開）
          - Dockerfile       # awscliツールのコンテナ情報
          - conf
            + s3           # s3bucketの設定
    - tests
      - e2e
        - tests.js         # e2eテストコード
      - unit
        - public
          - tests
            - index.html   # 単体テストの確認ページHTML。
    + dist                 # 出力結果
    
```

## 参考

[nginx設定ファイル格納先](http://gakumon.tech/nginx/nginx_conf_directory.html)
[alias](https://heartbeats.jp/hbblog/2012/04/nginx05.html)