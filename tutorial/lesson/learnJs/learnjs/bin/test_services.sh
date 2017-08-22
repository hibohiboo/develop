#!/bin/bash -x

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# docker-composeの起動。
# -w ワークディレクトリ
# --entrypoint コマンド
# サービス名
cd $bin_dir/../ && docker-compose run \
                                      -w /home/node \
                                      --entrypoint "./sspa test" \
                                      node