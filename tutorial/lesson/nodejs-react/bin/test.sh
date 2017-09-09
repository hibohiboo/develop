#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
#command=${1:-"node src/generator-test.js"}
#command=${1:-"node src/ch1/readfile-sync.js"}
#command=${1:-"node src/ch1/readfile-promise.js"}
#command=${1:-"node src/ch1/readfile-generator.js"}
command=${1:-"node src/ch1/readfile-async.js"}

# docker-composeの起動。bash実行
cd $bin_dir/../ && docker-compose run node $command