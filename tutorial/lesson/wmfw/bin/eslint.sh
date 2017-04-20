#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# npm run -s サイレントコマンド。余分なエラー表示をしない
docker-compose -f $bin_dir/../devtools/eslint/docker-compose.yml run wmfw_eslint \
                npm run -s eslint