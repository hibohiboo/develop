#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$bin_dir/../../..
docker_dir=$parent_dir/docker
dir_docker=$docker_dir
name=${1:-nodejs}

cd $dir_docker  && docker-compose run $name yarn babel /app/separate/pre-pre-dist/ --out-dir /app/separate/pre-dist/
