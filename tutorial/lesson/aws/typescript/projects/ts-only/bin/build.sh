#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
root_dir=$(cd $bin_dir/.. && pwd)

cd $root_dir && npm run build
