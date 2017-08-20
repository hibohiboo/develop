#!/bin/bash -x


# venv上のawscliで実行用に追加
source /home/vagrant/venv/bin/activate

bin_dir=$(cd $(dirname $0) && pwd)
$bin_dir/../sspa create_table /vagrant/tutorial/lesson/learnJs/learnjs/conf/dynamodb/tables/learnjs/ learnjs