#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
name=${1:-scss}
dir_docker="$bin_dir/../../docker"

cd $dir_docker  && docker-compose run $name yarn run stylelint /app/src/assets/css/*.scss --fix
