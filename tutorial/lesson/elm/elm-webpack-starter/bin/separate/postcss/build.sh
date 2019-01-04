#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$bin_dir/../../..
docker_dir=$parent_dir/docker
dir_docker=$docker_dir
name=${1:-elm}

cd $dir_docker  && docker-compose run $name yarn run postcss /app/separate/pre-pre-dist/**/*.css --base  /app/separate/pre-pre-dist/ --dir /app/separate/pre-dist/  --no-map