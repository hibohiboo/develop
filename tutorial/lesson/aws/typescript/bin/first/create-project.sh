#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
docker_dir=$(cd $bin_dir/../../docker && pwd)
container_name=${1:-cdk}

cd $docker_dir && docker-compose run $container_name /bin/bash -c 'cd projects && cdk init --language typescript && npm i @aws-cdk/aws-apigateway @aws-cdk/aws-lambda @aws-cdk/aws-dynamodb'


