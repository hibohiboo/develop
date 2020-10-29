#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
docker_dir=$(cd $bin_dir/../../docker && pwd)
container_name=${1:-cdk}

cd $docker_dir && docker-compose run $container_name /bin/bash -c 'cdk bootstrap aws://$AWS_ACCOUNT_ID/$AWS_DEFAULT_REGION'


