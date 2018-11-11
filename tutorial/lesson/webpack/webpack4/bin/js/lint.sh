#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
name=${1:-webpacks}
# オプション
# lint.sh --fix
# 修正できるものは修正する
dir_docker="$bin_dir/../../docker"
# docker-composeの起動。 
cd $dir_docker && docker-compose run $name yarn run -s eslint -- --ext .js src $@
#cd $dir_docker && docker-compose run lint npm run -s eslint -- -c .node.eslintrc --ext .js e2e $@

