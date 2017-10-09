#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
# tslint.sh --fix オプションで自動修正
cd $bin_dir/../docker && docker-compose run tslint /bin/bash -c "npm run -s tslint -- --type-check -c tslint.json src/**/*.ts src/**/*.tsx $@"