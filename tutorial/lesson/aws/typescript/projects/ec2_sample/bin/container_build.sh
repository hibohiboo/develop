#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$bin_dir/..
composeFile=${1:-"localstack-docker-compose.yml"}
# cp $parent_dir/package.json $parent_dir/docker/node/package.json
cd $parent_dir/docker && docker-compose -f $composeFile build
