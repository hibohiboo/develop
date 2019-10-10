### 環境変数書き換え

laradock/.env の APP_CODE_PATH_HOST

```diff
- APP_CODE_PATH_HOST=../sampleapp
+ #APP_CODE_PATH_HOST=../
```

```
./bin/restart.sh
./bin/bash.sh
composer create-project --prefer-dist laravel/laravel tdd_sample "6.0.*"
```
