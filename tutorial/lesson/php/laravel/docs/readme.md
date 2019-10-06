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

### 参考

[Laravel の php artisan migrate で](https://qiita.com/coldsleep6666/items/506fd6a92ff29aee90bb)
[DB でハマる](https://qiita.com/dnrsm/items/4bd078c17bb0d6888647)
[Laravel 書籍 参考ソース](https://github.com/laravel-socym)
