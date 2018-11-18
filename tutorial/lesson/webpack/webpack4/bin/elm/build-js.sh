#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
name=${1:-webpacks}
dir_docker="$bin_dir/../../docker"
inputFile="/app/src/assets/elm/ElmTest.elm"
outputFile="/app/dist/elm/elm-test.js"

# docker-composeの起動。 
cd $dir_docker  && docker-compose run $name /bin/bash -c yarn run elm make $inputFile --output=$outputFile --optimize
