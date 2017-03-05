#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# docker-composeの起動。 node app.jsでサンプルのプログラムを起動
cd $bin_dir/../ && docker-compose run sqlite node app.js