#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$bin_dir/..
docker_dir=$parent_dir/docker

rm -rf  $parent_dir/app/public

bash $bin_dir/separate/build.sh

mkdir -p $parent_dir/app/
cp -r $parent_dir/separate/pre-dist/* $parent_dir/app/