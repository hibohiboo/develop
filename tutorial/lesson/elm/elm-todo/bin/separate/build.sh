#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$bin_dir/../..
docker_dir=$parent_dir/docker

# elm -> ts -> js の順番で、依存関係
bash $bin_dir/elm/build.sh
