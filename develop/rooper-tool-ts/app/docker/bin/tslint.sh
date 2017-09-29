#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

cd $bin_dir/../tools && docker-compose run webpack /bin/bash -c "npm run -s tslint -- -c tslint.json 'src/**/*.ts' $@"