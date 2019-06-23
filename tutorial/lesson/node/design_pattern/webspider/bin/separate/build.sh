#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$bin_dir/../..
docker_dir=$parent_dir/docker
separate_dir=$parent_dir/separate

rm -rf $separate_dir/dist
rm -rf $separate_dir/pre-dist
rm -rf $separate_dir/pre-pre-dist

bash $bin_dir/ts/build.sh
bash $bin_dir/js/build.sh

