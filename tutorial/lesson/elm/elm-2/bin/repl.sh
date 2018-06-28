#!/bin/bash

# 変数設定
bin_dir=$(cd $(dirname $0) && pwd)
composeFile=${1:-"docker-compose.yml"}
containerName=${2:-"elm"}

# docker-composeの起動
cd $bin_dir/../docker && docker-compose -f $composeFile run $containerName /bin/bash -c "yarn repl"
