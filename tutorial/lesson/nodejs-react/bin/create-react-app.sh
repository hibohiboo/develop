#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# コピー先ディレクトリの作成
cd $bin_dir/../ && mkdir -p app

# docker-composeの起動。
# コンテナから必要なファイルのコピー
cd $bin_dir/../ && docker-compose up create-react-app \
                && docker cp create-react-app:/home/workdir/app/README.md app/README.md \
                && docker cp create-react-app:/home/workdir/app/package.json app/package.json \
                && docker cp create-react-app:/home/workdir/app/yarn.lock app/yarn.lock \
                && docker cp create-react-app:/home/workdir/app/src app/src \
                && docker cp create-react-app:/home/workdir/app/public app/public
                