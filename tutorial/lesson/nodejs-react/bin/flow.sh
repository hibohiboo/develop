#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# /* flow */の書かれているファイルをチェック
cd $bin_dir/../tools && docker-compose run flow npm run -s flow -- $@