#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
dir_bin=$(cd $(dirname $0) && pwd)
dir_root=$dir_bin/..
dir_docker=$dir_root/docker

# up.sh docker-compose.camp.yml
composeFile=${1:-"docker-compose.yml"}

# docker-composeの起動
cd $dir_docker && docker-compose -f $composeFile up
