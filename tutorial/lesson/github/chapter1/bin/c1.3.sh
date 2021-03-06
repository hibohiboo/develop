#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# docker-composeの起動。 コンテナ内に入る
cd $bin_dir/../ && docker-compose run ruby /bin/bash -c \
    "curl -s https://api.github.com/users/xrd/repos | jq '.[0].owner.id'"