#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# jsdoc作成
# cd $bin_dir/../devtools/sphinx && docker-compose run wmfw_sphinx jsdoc -d /root/build/api /root/src/wmfwapp/app.js

# esdoc作成
cd $bin_dir/../devtools/sphinx && docker-compose run wmfw_sphinx esdoc -c /root/.esdoc.json

# sphinxドキュメント作成
cd $bin_dir/../devtools/sphinx && docker-compose run wmfw_sphinx make html
