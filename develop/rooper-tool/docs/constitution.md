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
        + babel              # トランスパイラ
        + jasmine            # 単体テスト
        + lint               # 構文チェック
        - aws-cli            # aws関連
          + .aws             # awsのユーザ情報（非公開）
          - Dockerfile       # awscliツールのコンテナ情報
          - conf
            + s3           # s3bucketの設定
    + dist                 # 出力結果
    
```

## 参考

[nginx設定ファイル格納先](http://gakumon.tech/nginx/nginx_conf_directory.html)