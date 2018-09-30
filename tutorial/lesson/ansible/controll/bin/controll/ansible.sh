#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
cd $bin_dir/../../provision_targets

# ansibleはvenv環境にインストールしてある
source /home/vagrant/venv/bin/activate

# デプロイ
ANSIBLE_CONFIG=.ansible.cfg ansible-playbook -i inventory/inventory.ini deploy.yml --tags nginx,adminer
