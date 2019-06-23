#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$bin_dir/../../..
docker_dir=$parent_dir/docker
dir_docker=$docker_dir
name=${1:-nodejs}

# https://www.typescriptlang.org/docs/handbook/compiler-options.html
cd $dir_docker  && docker-compose run $name yarn run tsc --rootDir /app/src/ --outDir /app/separate/pre-pre-dist/