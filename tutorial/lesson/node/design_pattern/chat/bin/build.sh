#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$(cd $bin_dir/.. && pwd)
docker_dir=$(cd parent_dir/docker && pwd)

rm -rf  $parent_dir/app/public

bash $bin_dir/separate/build.sh

mkdir -p $parent_dir/app/
cp -r $parent_dir/separate/pre-dist/* $parent_dir/app/
cp -r $parent_dir/src/client/www $parent_dir/app/