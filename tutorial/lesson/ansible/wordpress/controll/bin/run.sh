#!/bin/bash
# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
filename=$1
private_key_path=$bin_dir/../.vagrant/machines/default/virtualbox/private_key
target_ip=192.168.50.100 

# 引数なしの場合はコントロールサーバのvagrantにログイン
if [[ $filename == "" ]]
then
    ssh $target_ip -l vagrant -i $private_key_path 
    exit
fi

if [[ $filename != *".sh" ]]
then
    filename=`echo $1`.sh
fi

# sshの場合は-t で疑似端末をつける
if [[ $filename == "ssh"* ]]
then
    # https://qiita.com/moroku0519/items/62686784a51ad54b6ac7
    ssh $target_ip -t -l vagrant -i $private_key_path bash /vagrant/bin/controll/$filename
    exit
fi

# その他の場合はcontrollフォルダ内のshellファイルをcontrollサーバに接続して実行
ssh $target_ip -l vagrant -i $private_key_path bash /vagrant/bin/controll/$filename
