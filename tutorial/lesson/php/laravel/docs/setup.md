## 最初にやること

```
mkdir laravel_docker
cd laravel_docker
git clone https://github.com/Laradock/laradock.git
cd laradock
cp env-example .env
```

## コンテナ起動 → コンテナにログイン

```
./bin/up.sh
./bin/login.sh
```

## 新規プロジェクト作成

```
composer create-project laravel/laravel sampleapp --prefer-dist "5.5.*"
```

- 少し反応が鈍かった。10 分くらい待ってもそのまま。
- ctrl+c で一旦切って、もう一度やったらうまくいった。接続かなにかに時間がかかっていた？
  せっかくなので 6.0 にしてみる。

```
composer create-project laravel/laravel sampleapp --prefer-dist "6.0.*"
```

### 環境変数書き換え

laradock/.env の APP_CODE_PATH_HOST

```diff
- APP_CODE_PATH_HOST=../
+ #APP_CODE_PATH_HOST=../
+ APP_CODE_PATH_HOST=../sampleapp
```

環境変数の変更を反映されるために再起動
アクセスして動作確認
http://192.168.50.10/
