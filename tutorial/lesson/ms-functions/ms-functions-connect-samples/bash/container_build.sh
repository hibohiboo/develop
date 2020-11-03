#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
docker_dir=$(cd $bin_dir/.. && pwd)

cd $docker_dir && docker-compose build
