setup.md
directory.md
test.md

### マイグレーション

```
php artisan migrate
```

うまくいかない。。。

laradock の mysql のバージョンを 5.7 に変更

#### laradock/.env

以下に書き直す。

```
MYSQL_VERSION=5.7
MYSQL_DATABASE=laravel
MYSQL_USER=laravel
MYSQL_PASSWORD=secret
MYSQL_PORT=3306
MYSQL_ROOT_PASSWORD=root
MYSQL_ENTRYPOINT_INITDB=./mysql/docker-entrypoint-initdb.d
```

再作成

```
sudo rm -rf ~/.laradock/data/mysql/
./bin/remove_all_container.sh
cd laravel_docker/laradock/ && docker-compose build --no-cache mysql
```

#### sampleapp/.env

アプリのほうの環境変数も変更

```
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=laravel
DB_PASSWORD=secret
```

### メールのテスト

mailhog を起動するコンテナに追加。
http://192.168.50.10:8025/ で動作確認。

#### sampleapp/.env

環境変数変更

```
MAIL_DRIVER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
```

#### リスナークラスを作成

```
php artisan event:generate
```

app フォルダに Listeners フォルダと EventListener.php, registerdListener.php ができる。

### 作業履歴

[ユーザ登録まで](https://github.com/hibohiboo/develop/tree/61c74d3d736eaf3f837d5bc6da4d86a1724c2f46/tutorial/lesson/php/laravel)

[ログイン・ログアウトまで](https://github.com/hibohiboo/develop/tree/b22fd2a9a55131d19b72601075d05e3c41581665/tutorial/lesson/php/laravel)

### 参考

[Laravel の php artisan migrate で](https://qiita.com/coldsleep6666/items/506fd6a92ff29aee90bb)
[DB でハマる](https://qiita.com/dnrsm/items/4bd078c17bb0d6888647)
[Laravel 書籍 参考ソース](https://github.com/laravel-socym)
[larahog](https://qiita.com/munimuni/items/b902f2c3ec643ed78e4a)
[](https://readouble.com/laravel/5.7/ja/upgrade.html)
