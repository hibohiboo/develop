#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
container=${1:-lint}
# docker-composeの起動。 コンテナ内に入る
cd $bin_dir/../ && docker-compose run $container /bin/bash