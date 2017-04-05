#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# jsdoc - minami template作成
cd $bin_dir/../devtools/jsdoc && docker-compose run wmfw_devtools_jsdoc jsdoc -c /root/.jsdoc.json

# sphinxドキュメント作成
cd $bin_dir/../devtools/sphinx && docker-compose run wmfw_devtools_sphinx make html
