#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$(cd $bin_dir/.. && pwd)
gcp_dir=$(cd $parent_dir/gcp && pwd)

bash $gcp_dir/bin/bash.sh

