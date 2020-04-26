#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$bin_dir/..
docker_dir=$parent_dir/docker
composeFile=${1:-"docker-compose.yml"}
container_name=${1:-realworld}

docker ps | grep $container_name

if [ $? -eq 0 ]; then
  cd $docker_dir && docker-compose exec $container_name go run /app/src/server.go
else
  cd $docker_dir && docker-compose run $container_name go run /app/src/server.go
fi

