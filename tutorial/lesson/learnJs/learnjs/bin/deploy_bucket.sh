#!/bin/bash -x


# venv上のawscliで実行用に追加
source /home/vagrant/venv/bin/activate

# http://learnjs.hibohiboo.com.s3-website-us-east-1.amazonaws.com/
bin_dir=$(cd $(dirname $0) && pwd)
$bin_dir/../sspa deploy_bucket learnjs.hibohiboo.com