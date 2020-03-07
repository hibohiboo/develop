#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$(cd $bin_dir/../.. && pwd)
dist_dir=$(cd $parent_dir/separate/dist && pwd)
pre_dist_dir=$(cd $parent_dir/separate/pre-dist && pwd)
app_dir=$(cd $parent_dir/app && pwd)

rm -rf $app_dir/public

# storybookディレクトリとhtmlファイルをコピー
cp -r $dist_dir $app_dir/public

mkdir -p $app_dir/public/assets

# cssファイルをコピー
cp -r $pre_dist_dir/assets/css $app_dir/public/assets/css

# manifestファイルをコピー
cp -r $parent_dir/manifest/manifest.json $app_dir/public/manifest.json
cp -r $parent_dir/manifest/serviceWorker.js $app_dir/public/serviceWorker.js
cp -r $parent_dir/manifest/index.js $app_dir/public/index.js
cp -r $parent_dir/manifest/icons $app_dir/public/icons
