#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$bin_dir/../../..
docker_dir=$parent_dir/docker
dir_docker=$docker_dir
name=${1:-elm}

# https://www.typescriptlang.org/docs/handbook/compiler-options.html
cd $dir_docker  && docker-compose run $name yarn run tsc --rootDir /app/src/ --outDir /app/separate/pre-pre-dist/ \
                && docker-compose run $name sed -i -e "s/scss/css/g"  /app/separate/pre-pre-dist/index.js
# コンパイラによって、scssがcssに置換されるので、ここで置き換えておく