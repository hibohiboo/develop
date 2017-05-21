#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
user="xrd"
pass="xxxxxxxx"

expect -c "
set timeout 5
spawn docker-compose -f $bin_dir/../docker-compose.yml run ruby /bin/bash -c \
    \"curl -u $user https://api.github.com/rate_limit\"
expect \"Enter\" 
send \"$pass\n\"
expect \"{\" 
exit 0
"