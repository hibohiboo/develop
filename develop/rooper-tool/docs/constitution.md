# ディレクトリ構成

```yml
rooper-tool
  - docker-compose.yml     # コンテナ管理ファイル
  - docs                   # ドキュメント類
    - constitution.md      # ディレクトリ構成について
  - scenario-maker         # シナリオ作成ページ
    - bin
      - bash.sh            # コンテナのbash起動
      - config_profile.sh  # awsのconfigを設定
      - container_build.sh # コンテナの作成
      - deploy.sh          # awsにデプロイ
      - sspa               # awsのスクリプト
      - start.sh           # dockerの起動
    - aws-cli              # aws関連
      + .aws               # awsのユーザ情報（非公開）
      - Dockerfile         # awscliツールのコンテナ情報
    - conf
      + s3                 # s3bucketの設定
    - tools                # 開発用ツール
      + babel              # トランスパイラ
      + jasmine            # 単体テスト
      + lint               # 構文チェック
    + dist                 # 出力結果
    
```