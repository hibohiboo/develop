#!/bin/bash
bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$(cd $bin_dir/../.. && pwd)
docker_dir=$(cd $parent_dir/docker && pwd)

cd $docker_dir && export $(cat .env | grep -v ^\# | xargs); \
cat << '_EOQ_' | docker exec --interactive mysql mysql $REDMINE_DB_DATABASE
UPDATE `roles` SET `permissions` = NULL WHERE `id` = '1' OR `id` = '2';
_EOQ_
