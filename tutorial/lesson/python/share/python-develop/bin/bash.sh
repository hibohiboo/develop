#!/bin/bash

# 引数を取得
# db データベースコンテナ
# otherdata データボリュームコンテナ：ログ
# dbdata    データボリュームコンテナ：データベース
# php7       PHP
# nginx     サーバー
contaner_name=%1

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# docker-composeの起動。
cd $bin_dir/../ && docker-compose run $1 /bin/bash

