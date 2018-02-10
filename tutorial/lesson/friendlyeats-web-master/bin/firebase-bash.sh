#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
name=${1:-firebase}

# docker-composeの起動。 コンテナ内に入る. OAuth用に9005. サンプルアプリ用に5000ポートを開放。
cd $bin_dir/../docker && docker-compose run -p 9005:9005 -p 5000:5000 $name /bin/bash 
# ログイン
# firebase login
# 準備
# firebase init