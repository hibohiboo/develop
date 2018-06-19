#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# docker メモリを２００M スワップ領域を１G
docker run -d --name kuard \
           --publish 8080:8080 \
           --memory 200m \
           --memory-swap 1G\
            hibohiboo66/kuard-amd64:1
