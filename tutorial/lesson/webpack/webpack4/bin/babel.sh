#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
name=${1:-webpacks}

# docker-composeの起動。 
cd $bin_dir/../docker && docker-compose run $name npx babel src --out-dir /app/dist
