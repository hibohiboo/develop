#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# オプション
# lint.sh --fix
# 修正できるものは修正する
# docker-composeの起動。 コンテナ内に入る
cd $bin_dir/../tools && docker-compose run lint npm run -s eslint -- --ext .js src $@