#!/bin/bash
# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
filename=$1
private_key_path=$bin_dir/../.vagrant/machines/default/virtualbox/private_key

if [[ $filename == "" ]]
then
    ssh 192.168.50.100 -l vagrant -i $private_key_path 
    exit
fi


if [[ $filename != *".sh" ]]
then
    filename=`echo $1`.sh
fi

ssh 192.168.50.100 -l vagrant -i $private_key_path bash /vagrant/bin/controll/$filename
