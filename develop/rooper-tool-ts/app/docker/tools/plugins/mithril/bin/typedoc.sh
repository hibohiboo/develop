#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

cd $bin_dir/.. && docker-compose run webpack /bin/bash -c "npm run typedoc -- --target es6 --jsx preserve --ignoreCompilerErrors --exclude **/*.test.ts --out ./typedoc/ ./src/"