#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# --fixオプションをつけて実行で、修正を行う。 ex.) lint.sh --fix

# docker-composeの起動。 コンテナ内に入る
cd $bin_dir/../ && docker-compose run lint npm run -s eslint -- --ext .js src $@