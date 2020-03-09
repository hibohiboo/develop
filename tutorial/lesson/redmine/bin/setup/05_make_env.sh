#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$(cd $bin_dir/../.. && pwd)
docker_dir=$(cd $parent_dir/docker && pwd)

DOMAIN=example.jp && \
FQDN=redmine.${DOMAIN} && \
cat << _EOF_ > ${docker_dir}/.env
REDMINE_PATH=/srv/redmine
TZ=Asia/Tokyo
MYSQL_ROOT_PASSWORD=$(< /dev/urandom tr -dc 'A-Za-z0-9!$%&()*+,-./:;<=>?@[\]^_{|}~' | head -c 16; echo)
REDMINE_DB_MYSQL=mysql
REDMINE_DB_DATABASE=redmine_$(< /dev/urandom tr -dc 'A-Za-z0-9' | head -c 8; echo)
REDMINE_DB_USERNAME=redmine_$(< /dev/urandom tr -dc 'A-Za-z0-9' | head -c 8; echo)
REDMINE_DB_PASSWORD=$(< /dev/urandom tr -dc 'A-Za-z0-9!$%&()*+,-./:;<=>?@[\]^_{|}~' | head -c 16; echo)
REDMINE_DB_ENCODING=utf8mb4
REDMINE_MEMCACHED=memcached
VIRTUAL_HOST=$(echo ${FQDN})
VIRTUAL_PORT=3000
LETSENCRYPT_HOST=$(echo ${FQDN})
LETSENCRYPT_EMAIL=redmine@$(echo $DOMAIN)
_EOF_
chmod 444 $docker_dir/.env