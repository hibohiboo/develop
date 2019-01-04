#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$bin_dir/../../..
docker_dir=$parent_dir/docker
dir_docker=$docker_dir
name=${1:-elm}

# 拡張子指定に半角空白を入れないように注意。 【{png,jpg}:OK】【{png, jpg}:NG】
cd $dir_docker && docker-compose run  $name yarn run cpx "/app/src/**/*.{png,jpg}" /app/separate/pre-dist 
cd $dir_docker && docker-compose run  $name yarn run cpx "/app/src/**/*.{png,jpg}" /app/separate/pre-pre-dist 
