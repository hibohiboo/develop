#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
name=${1:-postcss}
dir_docker="$bin_dir/../../docker"

# docker-composeの起動。 
cd $dir_docker  && docker-compose run $name yarn run postcss /app/src/assets/css/*.css --use autoprefixer --no-map --dir /app/dist/assets/css/