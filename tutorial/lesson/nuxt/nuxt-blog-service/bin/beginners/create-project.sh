#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
dir_bin=$(cd $(dirname $0) && pwd)
dir_root=$dir_bin/../..
cd $dir_root/docker && docker-compose run nuxt /bin/bash -c 'cd /app/src && vue init nuxt-community/starter-template mypage'