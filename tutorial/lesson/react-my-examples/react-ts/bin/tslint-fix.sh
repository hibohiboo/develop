#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# docker-composeの起動。 コンテナ内に入る
cd $bin_dir/../ && docker-compose run lesson_tslint_tool npm run -s tslint-fix