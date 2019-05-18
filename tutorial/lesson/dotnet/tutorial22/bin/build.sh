#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$bin_dir/..
docker_dir=$parent_dir/docker

rm -rf  $parent_dir/app/public

bash $bin_dir/separate/build.sh

cp -r $parent_dir/separate/dist $parent_dir/app/public