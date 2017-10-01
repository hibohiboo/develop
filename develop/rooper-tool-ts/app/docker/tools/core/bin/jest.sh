#!/bin/bash

# option
# --updateSnapshot スナップショットの更新
# -u スナップショットの更新
# --coverage カバレッジの出力
option=${@:---coverage}

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

cd $bin_dir/.. && docker-compose run jest /bin/bash -c "npm run -s jest -- $option"