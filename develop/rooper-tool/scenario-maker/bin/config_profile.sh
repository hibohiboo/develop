#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

profile=${1:-admin}

# docker-composeの起動
function aws(){
  COMPOSE_FILE=$bin_dir/../docker-compose.yml docker-compose run awscli /bin/bash -c "aws $@"
}

aws configure --profile $profile