#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
name=${1:-s2s}

cd $bin_dir/../docker && docker-compose run $name yarn build
