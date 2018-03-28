#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
name=${1:-alpine}
# docker-composeの起動。 コンテナ内に入る4
cd $bin_dir/../ && docker-compose run $name node src/test2.js