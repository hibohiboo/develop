#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# jsdoc作成
cd $bin_dir/../ && docker-compose run documentation_generator jsdoc -d /root/build/api/jsdoc /root/src -r

# jsdoc作成 - minamiテンプレート
cd $bin_dir/../ && docker-compose run documentation_generator jsdoc -c /root/.jsdoc.json

# jsdoc作成 - jsdoc-sphinxテンプレート
cd $bin_dir/../ && docker-compose run documentation_generator jsdoc -t node_modules/jsdoc-sphinx/template -d /root/source/contents/jsdoc-sphinx /root/src -r

# esdoc作成
cd $bin_dir/../ && docker-compose run documentation_generator esdoc -c /root/.esdoc.json


# sphinxドキュメント作成
cd $bin_dir/../ && docker-compose run documentation_generator make html
