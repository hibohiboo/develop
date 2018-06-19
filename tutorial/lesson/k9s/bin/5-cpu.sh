#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# docker メモリを２００M スワップ領域を１G cpu使用率制限
docker run -d --name kuard \
           --publish 8080:8080 \
           --memory 200m \
           --memory-swap 1G \
           --cpu-shares 1024 \
            hibohiboo66/kuard-amd64:1
