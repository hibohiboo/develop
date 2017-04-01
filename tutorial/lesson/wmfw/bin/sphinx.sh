#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# 
cd $bin_dir/../devtools/sphinx && docker-compose run wmfw_sphinx make html #jsdoc -t node_modules/jsdoc-sphinx/template -d /root/build /root/src/wmfwapp/test.js
