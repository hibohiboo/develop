#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$(cd $bin_dir/.. && pwd)
docker_dir=$(cd $parent_dir/docker && pwd)

rm -rf  $parent_dir/app

# 分割ビルドはいったんオフ
# bash $bin_dir/separate/build.sh

# mkdir -p $parent_dir/app/
# cp -r $parent_dir/separate/pre-dist/* $parent_dir/app/
name=${1:-nodejs}
cd $docker_dir  && docker-compose run $name npm run build


