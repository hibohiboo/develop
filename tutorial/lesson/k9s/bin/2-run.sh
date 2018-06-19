#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

docker run -d --name kuard --publish 8080:8080  hibohiboo66/kuard-amd64:1