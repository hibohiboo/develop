#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
command=${1:-"npm run babel -- src/ch1/arrow-test.js -o dist/ch1/arrow-test.out.js"}

# docker-composeの起動。 コンテナ内に入る
cd $bin_dir/../ && docker-compose run babel $command