#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$bin_dir/..
docker_dir=$parent_dir/docker

# up.sh docker-compose.camp.yml
composeFile=${1:-"docker-compose.yml"}

# docker-composeの起動
cd $docker_dir && docker-compose -f $composeFile up
