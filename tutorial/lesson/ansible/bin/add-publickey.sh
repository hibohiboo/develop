#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)

# 192.168.74.60 の .ssh/authorized_keysに公開鍵を登録
# ※公開鍵を置いているフォルダに秘密鍵もペアとなっていないと失敗する
ssh-copy-id -o StrictHostKeyChecking=no -i $bin_dir/id_rsa.pub 192.168.74.60
