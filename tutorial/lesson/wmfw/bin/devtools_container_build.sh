#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# eslint
cd $bin_dir/../devtools/eslint && docker-compose build

# jsdoc
cd $bin_dir/../devtools/jsdoc && docker-compose build

# sphinx
cd $bin_dir/../devtools/sphinx && docker-compose build
