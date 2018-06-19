#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# イメージを削除。 docker rmi <タグ名>  or docker rmi <イメージID> 。イメージidは省略可能。最初の3文字でOK.
docker rmi hibohiboo66/kuard-amd64:1
