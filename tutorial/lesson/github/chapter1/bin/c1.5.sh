#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
user="xrd"
pass="xxxxxx"
cmd="curl -u $user -d '{\"scopes\":[\"public_repo\"],\"note\":\"A new authorization\"}' https://api.github.com/authorizations"

expect << END
set timeout 5
spawn docker-compose -f $bin_dir/../docker-compose.yml run ruby /bin/bash -c \
  "curl -u $user -d '{\"scopes\":\[\"public_repo\"\],\"note\":\"A new authorization\"}' https://api.github.com/authorizations"
expect "Enter" 
send "$pass\n"
expect "{" 
exit 0
END

# docker-compose -f $bin_dir/../docker-compose.yml run ruby /bin/bash -c \
#     "$cmd"