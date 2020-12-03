#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$(cd $bin_dir/../.. && pwd)
docker_dir=$parent_dir

cd $docker_dir && docker build -t node-app --build-arg NODE_ENV=production .
