#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
docker_dir=$(cd $bin_dir/../docker && pwd)
# up.sh docker-compose.camp.yml
composeFile=${1:-"docker-compose.yml"}

# docker-composeの起動
cd $docker_dir && docker-compose -f $composeFile up
