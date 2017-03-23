#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# docker-composeの起動。 コンテナ内に入る
cd $bin_dir/../ && docker-compose run sphinx-js jsdoc -t node_modules/jsdoc-sphinx/template -d source/apidoc src/code.js
cd $bin_dir/../ && docker-compose up