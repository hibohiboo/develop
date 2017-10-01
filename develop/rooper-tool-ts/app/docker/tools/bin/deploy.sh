#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
mkdir -p $bin_dir/../../../dist/deploy/assets/js
cp $bin_dir/../../../public/index.html $bin_dir/../../../dist/deploy/
cp $bin_dir/../../../dist/bundle-webpack/app.bundle.js $bin_dir/../../../dist/deploy/assets/js/
cp   $bin_dir/../../../dist/bundle-webpack/vendor.bundle.js $bin_dir/../../../dist/deploy/assets/js/

$bin_dir/sspa deploy_bucket rooper.hibohiboo.com