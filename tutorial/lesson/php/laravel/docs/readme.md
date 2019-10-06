## 最初にやること

```
cd laradock
cp env-example .en
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
