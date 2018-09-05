#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# docker-composeの起動。 storage_imageコンテナ内に入る
cd $bin_dir/../docker && docker-compose build

