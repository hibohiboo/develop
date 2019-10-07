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

#### 確認

コンソールが面倒なので adminer を追加した。
http://192.168.50.10:8080/?server=mysql&username=laravel&db=laravel&select=users

### 作業履歴

[ユーザ登録まで](https://github.com/hibohiboo/develop/tree/61c74d3d736eaf3f837d5bc6da4d86a1724c2f46/tutorial/lesson/php/laravel)

[ログイン・ログアウトまで](https://github.com/hibohiboo/develop/tree/b22fd2a9a55131d19b72601075d05e3c41581665/tutorial/lesson/php/laravel)

### XDebug の設定

- 以下のファイルで環境変数を true に変更する
  laradock/.env

```
WORKSPACE_INSTALL_XDEBUG=true
```

- 以下の２つのファイルを同じ設定にする
  laradock/php-fpm/xdebug.ini
  laradock/workspace/xdebug.ini

※ vagrant で動かしているので、xdebug.remote_host=10.0.2.2

```
xdebug.remote_host=10.0.2.2
xdebug.remote_connect_back=0
xdebug.remote_port=9001
xdebug.idekey=Listen for XDebug

xdebug.remote_autostart=1
xdebug.remote_enable=1
xdebug.cli_color=1
xdebug.profiler_enable=0
xdebug.profiler_output_dir="~/xdebug/phpstorm/tmp/profiling"

xdebug.remote_handler=dbgp
xdebug.remote_mode=req

xdebug.var_display_max_children=-1
xdebug.var_display_max_data=-1
xdebug.var_display_max_depth=-1
```

コンテナ作り直し

```
docker-compose build php-fpm workspace
```

[xdebug 作成時点](https://github.com/hibohiboo/develop/tree/0c4f2b7964cdaf04576642331dc09b780a979d5d/tutorial/lesson/php/laravel)

### インテリジェンスの設定

php をインストール

```
cinst php -y
C:\ProgramData\chocolatey\lib\php\tools\php-7.3.10-nts-Win32-VC15-x64.zip to C:\tools\php73...
```

.vscode/settings.json

```
{
  "php.executablePath": "C:\\tools\\php73\\php.exe"
}
```

### 参考

[Laravel の php artisan migrate で](https://qiita.com/coldsleep6666/items/506fd6a92ff29aee90bb)
[DB でハマる](https://qiita.com/dnrsm/items/4bd078c17bb0d6888647)
[Laravel 書籍 参考ソース](https://github.com/laravel-socym)
[larahog](https://qiita.com/munimuni/items/b902f2c3ec643ed78e4a)
[](https://readouble.com/laravel/5.7/ja/upgrade.html)
[mailhog](https://liginc.co.jp/466522)
[](https://qiita.com/kiyo-tomo/items/a8af37537976d15c67e2)
[VSCode で xdebug を利用する on ローカル開発 with Laravel プロジェクト](https://qiita.com/darum/items/d539e916fa6873fe2061)
[docker+laravel+VSCode+Xdebug という開発環境を作る](https://qiita.com/kefian1go/items/bbc8f9d51fe890194ad7)
[homebrew で PHP+XDebug+VSCode の開発環境構築をやり直す](https://qiita.com/kiwi26/items/7e94fb042c5ae819d2d8)
