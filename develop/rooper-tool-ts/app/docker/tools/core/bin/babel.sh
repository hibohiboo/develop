#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
command=${1:-"npm run babel"}

# docker-composeの起動
cd $bin_dir/.. && docker-compose run babel $command