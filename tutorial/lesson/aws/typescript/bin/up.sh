#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
docker_dir=$(cd $bin_dir/../docker && pwd)
container_name=${1:-project-cdk}

  cd $docker_dir && docker-compose up $container_name 


