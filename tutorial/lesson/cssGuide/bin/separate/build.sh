#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$bin_dir/../..
docker_dir=$parent_dir/docker
separate_dir=$parent_dir/separate

rm -rf $separate_dir/dist
rm -rf $separate_dir/pre-dist
rm -rf $separate_dir/pre-pre-dist

# html作成
bash $bin_dir/pug/build.sh

# 静的ファイルコピー
bash $bin_dir/files/build.sh

# scss -> postcss の順番で依存関係があるので、順番を入れ替えてはならない
bash $bin_dir/scss/build.sh
bash $bin_dir/postcss/build.sh
