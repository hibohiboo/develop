#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# docker-composeのコンテナ作成
#cd $bin_dir/../tools && docker-compose up -d --build
cd $bin_dir/../tools && docker-compose up