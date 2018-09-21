#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
# デフォルト値をbuild_prodに
command=${1:-build_prod}
# docker-composeを起動し、コンテナ内で npm run buildを実行
cd $bin_dir/../ && docker-compose run lesson_buildtool_redux_form npm run $command