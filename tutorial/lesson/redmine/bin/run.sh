#!/bin/bash
bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$(cd $bin_dir/.. && pwd)
docker_dir=$(cd $parent_dir/docker && pwd)

cd $docker_dir && export $(cat .env | grep -v ^\# | xargs); \
docker-compose --project-directory /srv/redmine up --detach && \
sleep 30 && \
docker container logs --follow redmine