#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# jsdoc作成
cd $bin_dir/../devtools/sphinx && docker-compose run wmfw_sphinx jsdoc -d /root/build/api /root/src/wmfwapp/app.js
# sphinxドキュメント作成
cd $bin_dir/../devtools/sphinx && docker-compose run wmfw_sphinx make html
#jsdoc -t node_modules/jsdoc-sphinx/template -d /root/build /root/src/wmfwapp/test.js
