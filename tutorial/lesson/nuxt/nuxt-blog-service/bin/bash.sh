#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
dir_bin=$(cd $(dirname $0) && pwd)
dir_root=$dir_bin/..
dir_docker=$dir_root/docker
container_name=${1:-nuxt}

# $container_nameの有無をgrepで調べる
docker ps | grep $container_name

# grepの戻り値$?の評価。 grep戻り値 0:一致した 1:一致しなかった
if [ $? -eq 0 ]; then
  # 一致したときの処理
  cd $dir_docker && docker-compose exec $container_name bash
else
  # 一致しなかった時の処理
  # コンテナを立ち上げて接続
  cd $dir_docker && docker-compose run $container_name /bin/bash
fi


