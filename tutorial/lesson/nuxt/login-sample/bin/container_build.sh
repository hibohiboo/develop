#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
dir_bin=$(cd $(dirname $0) && pwd)

cd $dir_bin/../docker && docker-compose build