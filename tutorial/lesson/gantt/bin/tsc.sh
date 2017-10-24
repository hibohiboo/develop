#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
name=${1:-webpack}

# docker-composeの起動。 コンテナ内に入る
cd $bin_dir/../docker && docker-compose run tsc