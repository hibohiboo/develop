#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
name=${1:-webpacks}
dir_docker="$bin_dir/../../docker"

inputFile="/app/src/assets/elm/Page1.elm"
outputFile="/app/src/assets/elm/Page1.js"
cd $dir_docker  && docker-compose run $name /bin/bash -c yarn run elm make $inputFile --output=$outputFile  --optimize

inputFile="/app/src/assets/elm/Page2.elm"
outputFile="/app/src/assets/elm/Page2.js"
cd $dir_docker  && docker-compose run $name /bin/bash -c yarn run elm make $inputFile --output=$outputFile --optimize
