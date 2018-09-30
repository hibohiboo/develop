#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
cd $bin_dir/../provision

# ansibleはvenv環境にインストールしてある
source /home/vagrant/venv/bin/activate

# wordpress デプロイ
#ANSIBLE_CONFIG=.ansible.cfg ansible-playbook -i inventory/inventory.ini wordpress_deploy.yml --tags redmine

# redmine デプロイ
ANSIBLE_CONFIG=.ansible.cfg ansible-playbook -i inventory/inventory.ini redmine_deploy.yml
