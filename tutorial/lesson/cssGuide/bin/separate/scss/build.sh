#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$bin_dir/../../..
docker_dir=$parent_dir/docker
dir_docker=$docker_dir
name=${1:-storybook}

cd $dir_docker  && docker-compose run $name yarn run node-sass -r /app/src/ -o /app/separate/pre-pre-dist/
