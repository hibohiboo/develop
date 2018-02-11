#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
name=${1:-firebase}
# $container_nameの有無をgrepで調べる
docker ps | grep $name

# grepの戻り値$?の評価。 grep戻り値 0:一致した 1:一致しなかった
if [ $? -eq 0 ]; then
  # 一致したときの処理
  cd $bin_dir/../docker && docker-compose exec $name firebase deploy --only firestore:indexes --token "$FIREBASE_TOKEN"
else
  # 一致しなかった時の処理
  # コンテナを立ち上げて接続
  # docker-composeの起動。 OAuth用に9005. サンプルアプリ用に5000ポートを開放。
  cd $bin_dir/../docker && docker-compose run -p 9005:9005 -p 5000:5000 $name firebase deploy --only firestore:indexes --token "$FIREBASE_TOKEN"
fi

