#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
name=${1:-pug}

# docker-composeの起動。 
cd $bin_dir/../docker && docker-compose run $name npm run build-pug
