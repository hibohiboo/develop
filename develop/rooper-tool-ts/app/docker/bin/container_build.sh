#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# docker-composeの起動。 docker-compsoe.ymlに記載されたcmdが実行される。
cd $bin_dir/../ && docker-compose build
cd $bin_dir/../tools && docker-compose build
cd $bin_dir/../tools/core && docker-compose build
cd $bin_dir/../tools/plugins && docker-compose build