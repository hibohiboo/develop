#!/bin/bash
bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$(cd $bin_dir/.. && pwd)
docker_dir=$(cd $parent_dir/laravel_docker/laradock && pwd)

cd $docker_dir
docker-compose stop
docker-compose up -d nginx mysql workspace phpmyadmin
