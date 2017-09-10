#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
command=${1:-"npm run babel -- src -d dist"}

# docker-composeの起動。 コンテナ内に入る
cd $bin_dir/../tools && docker-compose run babel $command