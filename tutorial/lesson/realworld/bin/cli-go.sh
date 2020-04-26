#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$bin_dir/..
docker_dir=$parent_dir/docker
composeFile=${1:-"docker-compose.yml"}
container_name=${1:-realworld}

# cd $docker_dir && docker-compose run $container_name go run /app/handson/chapter3/src/sample1.go
# cd $docker_dir && docker-compose run $container_name go run /app/handson/chapter3/src/sample2.go
cd $docker_dir && docker-compose run $container_name go run /app/handson/chapter3/src/sample3.go
