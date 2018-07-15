#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
container_name=${1:-dbserver}

# 環境変数読み込み
. $bin_dir/../docker/.env

# $container_nameの有無をgrepで調べる
docker ps | grep $container_name

# grepの戻り値$?の評価。 grep戻り値 0:一致した 1:一致しなかった
if [ $? -eq 0 ]; then
  # 一致したときの処理

  # 初期ユーザ
  # cd $bin_dir/../docker && docker-compose exec $container_name  sqlplus sys/$ORACLE_PWD@localhost:1521/XE as sysdba

  # 作成したユーザ
  cd $bin_dir/../docker && docker-compose exec $container_name  sqlplus testuser/$USER_PASS@localhost:1521/XE

else
  # 一致しなかった時の処理
  # コンテナを立ち上げて接続
  cd $bin_dir/../docker && docker-compose up -d \
      && echo "データベースを立ち上げ中。15秒ほどお待ちください。。"  && sleep 2 \
      && echo "wait 13 seconds"  && sleep 5 \
      && echo "wait 8 seconds"  && sleep 3 \
      && echo "wait 5 seconds"  && sleep 2 \
      && echo "wait 3 seconds"  && sleep 1 \
      && echo "wait 2 seconds"  && sleep 1 \
      && echo "wait 1 seconds"  && sleep 1
  echo "データベース立ち上げ完了。Enterキーを2回押してください。その後、シェルをもう一度実行してください。"
  echo ">SQL の入力画面にならなかった場合は、もう数秒待って再度シェルを実行してください。"
  cd $bin_dir/../docker && docker-compose exec $container_name  sqlplus sys/$ORACLE_PWD@localhost:1521/XE as sysdba  > /dev/null 2>&1

fi
