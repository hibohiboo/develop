#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$bin_dir/../..
docker_dir=$parent_dir/docker

# cp -r $bin_dir/../app/public $bin_dir/../bkup/public-` date +"%Y%m%d%I%M%S"`
# rm -rf $bin_dir/../app/public
# rm -rf $bin_dir/../dist/assets
# rm -rf $bin_dir/../dist/html
# rm -rf $bin_dir/../pre-dist/assets

# html作成
bash $bin_dir/pug/build.sh

# 静的ファイルコピー
bash $bin_dir/files/build.sh

# scss -> postcss の順番で依存関係があるので、順番を入れ替えてはならない
bash $bin_dir/scss/build.sh
bash $bin_dir/postcss/build.sh

# elm -> ts -> js の順番で、依存関係
bash $bin_dir/elm/build.sh
bash $bin_dir/ts/build.sh
bash $bin_dir/js/build.sh

bash $bin_dir/webpack/build.sh

