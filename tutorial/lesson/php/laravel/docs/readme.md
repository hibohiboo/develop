setup.md
directory.md
test.md

### マイグレーション

```
php artisan migrate
```

laradock の mysql のバージョンを 5.7 に変更でうまくいった。

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

[登録完了メール送信](https://github.com/hibohiboo/develop/tree/05a382da68df5d5bdd4f72153dca5c2da203e62e/tutorial/lesson/php/laravel)

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

### gcp にデプロイ

laravel_docker/sampleapp/app.yml を作成。

```
runtime: php72

env_variables:
  ## Put production environment variables here.
  APP_KEY: YOUR_APP_KEY
  APP_STORAGE: /tmp
  VIEW_COMPILED_PATH: /tmp
  SESSION_DRIVER: cookie
```

以下を実行して app.yml を更新。

```
./bin/bash
sed -i "s#YOUR_APP_KEY#$(php artisan key:generate --show --no-ansi)#" app.yaml
```

laravel_docker/sampleapp/bootstrap/app.php に以下を追記。

```diff
$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    App\Exceptions\Handler::class
);
+ # [START] Set the storage path to the environment variable APP_STORAGE
+ /*
+ |--------------------------------------------------------------------------
+ | Set Storage Path
+ |--------------------------------------------------------------------------
+ |
+ | This script allows us to override the default storage location used by
+ | the  application.  You may set the APP_STORAGE environment variable
+ | in your .env file,  if not set the default location will be used
+ |
+ */
+ $app->useStoragePath(env('APP_STORAGE', base_path() . '/storage'));
+ # [END]
```

開発サーバの削除

```
composer remove --dev beyondcode/laravel-dump-server
```

GCP の設定。
gcp/.env に プロジェクト ID を設定。

```
CLOUDSDK_CORE_PROJECT=プロジェクトID
```

```
./bin/gcp_bash.sh
gcloud auth login
gcloud app deploy
```

ログインする権限を間違えると以下が出る。

```
ERROR: (gcloud.app.deploy) Permissions error fetching application [apps/プロジェクトID]. Please make sure you are using the correct project ID and that you have permission to view applications on the project.
```

間違えないと、リージョンの場所を聞かれる。東アジアでよいだろうと 1 を選択。
→ 東アジアは香港だった。 東京は asia-northeast1 であった。

```
Please choose the region where you want your App Engine application
located:
 [1] asia-east2    (supports standard and flexible)
 Please enter your numeric choice:  1
```

情報の確認がある。 Y。

```
target url:      [https://whitemap.appspot.com]


Do you want to continue (Y/n)?
```

失敗した。 Cloud Build API が有効になっていない模様。
なお、これを有効にすると Firebase が Blaze プランとなる。
Firebase を使っているプロジェクトで行う場合には注意。

```
Updating service [default]...failed.
ERROR: (gcloud.app.deploy) Error Response: [7] Access Not Configured. Cloud Build has not been used in project whitemap before or it is disabled. Enable it by visiting https://console.developers.google.com/apis/api/cloudbuild.googleapis.com/overview?project=whitemap then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry.
```

デプロイに成功したのでアクセス。
https://whitemaptrpg.appspot.com]

以下のエラーが出ている。

```
There is no existing directory at "/var/www/storage/logs" and its not buildable: Read-only file system
```

[Stack over flow](https://stackoverflow.com/questions/58087153/laravel-with-app-engine-standard-class-facade-ignition-ignitionserviceprovider)で同様の症状の人がいたので踏襲。

```
gcloud beta app deploy --no-cache
```

ログ出力に対応する。

```
composer require google/cloud-logging google/cloud-error-reporting
```

app/Logging/CreateStackdriverLogger.php を作成

config/logging.php を修正

エラー時のログに対応する。

```
use Google\Cloud\ErrorReporting\Bootstrap;
```

app/Exceptions/Handler.php:

上記設定しても解決せず。

composer.json の scripts ブロックに post-install-cmd を追加。
`There is no existing directory at "/var/www/storage/logs" and its not buildable: Read-only file system`のエラーはこれで消えた。

```
    "scripts": {
        // ....
        "post-install-cmd": [
            "chmod -R 755 bootstrap/cache",
            "php artisan cache:clear"
        ]
```

[gcp 接続時点](https://github.com/hibohiboo/develop/tree/236d7b57afafdb6601ed8a7241aa0e9d88b80401/tutorial/lesson/php/laravel)

### 参考

[Laravel の php artisan migrate で](https://qiita.com/coldsleep6666/items/506fd6a92ff29aee90bb)
[DB でハマる](https://qiita.com/dnrsm/items/4bd078c17bb0d6888647)
[Laravel 書籍 参考ソース](https://github.com/laravel-socym)
[larahog](https://qiita.com/munimuni/items/b902f2c3ec643ed78e4a)
[5.6 から 5.7.0 へのアップグレード](https://readouble.com/laravel/5.7/ja/upgrade.html)
[mailhog](https://liginc.co.jp/466522)
[Homestead MailHog を利用する](https://qiita.com/kiyo-tomo/items/a8af37537976d15c67e2)
[VSCode で xdebug を利用する on ローカル開発 with Laravel プロジェクト](https://qiita.com/darum/items/d539e916fa6873fe2061)
[docker+laravel+VSCode+Xdebug という開発環境を作る](https://qiita.com/kefian1go/items/bbc8f9d51fe890194ad7)
[homebrew で PHP+XDebug+VSCode の開発環境構築をやり直す](https://qiita.com/kiwi26/items/7e94fb042c5ae819d2d8)
[PhpStorm で Xdebug を使えるようにしよう！](https://qiita.com/taniai-lvgs/items/8e9eba112d2d0ed2530f)
[Run Laravel on Google App Engine standard environment](https://cloud.google.com/community/tutorials/run-laravel-on-appengine-standard)
[gcp プロジェクト削除](https://qiita.com/sekitaka_1214/items/e11287b78adf3f468d7f)
[so]](https://stackoverflow.com/questions/56126481/gcloud-error-gcloud-app-deploy-permissions-error-fetching-application)
[](https://qiita.com/fumihiko-hidaka/items/ac60b920155c31b61eaf)
[Build](https://cloud.google.com/cloud-build/docs/?_ga=2.97529884.-2054062782.1506606940)
[Stack over flow](https://stackoverflow.com/questions/58087153/laravel-with-app-engine-standard-class-facade-ignition-ignitionserviceprovider)
[GCP Laravel](https://cloud.google.com/community/tutorials/run-laravel-on-appengine-standard?hl=ja)
[Laravel Framework on App Engine Standard for PHP 7.2](https://github.com/GoogleCloudPlatform/php-docs-samples/tree/master/appengine/php72/laravel-framework)
[app.yaml 構成ファイル](https://cloud.google.com/appengine/docs/standard/php7/config/appref#example)
[Laravel6.0 の基本のタスクリスト](https://qiita.com/ucan-lab/items/36f6e89abad26a68f69a)
[Laravel の標準ディレクトリの変更方法 まとめ](https://qiita.com/kd9951/items/45f4cfc19bfc99a90a02)
[laravel プロジェクトを作成し GAE に展開する](https://qiita.com/bleru/items/153a228ad88d04b58d90)
[GCP Laravel](https://cloud.google.com/community/tutorials/run-laravel-on-appengine-flexible)
[Laravel5.5 を Google App Engine で動かす](https://qiita.com/fullkawa/items/4d6b080385de5523835c)
