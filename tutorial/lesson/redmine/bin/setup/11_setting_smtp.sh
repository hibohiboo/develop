#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$(cd $bin_dir/../.. && pwd)
docker_dir=$(cd $parent_dir/docker && pwd)

cd $docker_dir && export $(cat .env | grep -v ^\# | xargs); \
NETWORK=$(docker container inspect redmine --format='{{.HostConfig.NetworkMode}}') && \
GATEWAY=$(docker network inspect ${NETWORK} --format='{{range .IPAM.Config}}{{.Gateway}}{{end}}') && \
cat << _EOF_ > /srv/redmine/config/configuration.yml
default:
  email_delivery:
    delivery_method: :smtp
    smtp_settings:
      address: maildev
      port: 25
      domain: redmine.example.jp
      authentication: :login
      user_name: ${MAILDEV_SMTP_USER}
      password: ${MAILDEV_SMTP_PASSWORD}
_EOF_
