#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# docker-composeをバックグランドで起動
cd $bin_dir/.. && docker-compose up -d
cd $bin_dir/../tools && docker-compose up -d
