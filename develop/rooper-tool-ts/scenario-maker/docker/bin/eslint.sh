#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# オプション
# lint.sh --fix
# 修正できるものは修正する
# docker-composeの起動。 コンテナ内に入る
cd $bin_dir/../tools && docker-compose run eslint npm run -s eslint -- --ext .js src $@
cd $bin_dir/../tools && docker-compose run eslint npm run -s eslint -- -c .node.eslintrc --ext .js e2e $@

