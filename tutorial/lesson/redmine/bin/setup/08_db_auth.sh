#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$(cd $bin_dir/../.. && pwd)
docker_dir=$(cd $parent_dir/docker && pwd)

grep REDMINE_DB_PASSWORD $docker_dir/.env
cd $docker_dir && export $(cat .env | grep -v ^\# | xargs); \
docker exec -it mysql mysql_config_editor set --host=localhost --user=$REDMINE_DB_USERNAME --password
