#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# docker-composeを起動し、コンテナ内で npm run buildを実行
cd $bin_dir/../ && docker-compose run lesson_buildtool_redux_form npm run build