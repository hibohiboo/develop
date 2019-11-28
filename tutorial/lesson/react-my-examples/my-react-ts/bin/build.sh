#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$(cd $bin_dir/.. && pwd)
docker_dir=$(cd $parent_dir/docker && pwd)
dist_dir=$(cd $parent_dir/dest/dist/udonarium && pwd)
container_name=${1:-my_react_ts}
rm -rf $dist_dir
cd $docker_dir && docker-compose run -e NODE_ENV=production $container_name /bin/bash -c  'npm run build -- --prod && cp -r /app/dist /app/dest/'

vendor_dir=$(cd $parent_dir/.. && pwd)
root_dir=$(cd $vendor_dir/.. && pwd)
public_dir=$(cd $root_dir/app/public && pwd)

rm -rf $public_dir/udonarium
cp -r $dist_dir $public_dir/udonarium
