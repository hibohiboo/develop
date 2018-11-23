#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
name=${1:-scss}
dir_docker="$bin_dir/../../docker"

# docker-composeの起動。 
cd $dir_docker  && docker-compose run $name yarn run node-sass -r /app/src/assets/css -o /app/dist/assets/css
