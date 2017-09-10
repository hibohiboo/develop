#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
container=${1:-"flow"}
# docker-composeの起動。 コンテナ内に入る
cd $bin_dir/../tools && docker-compose run $container /bin/bash