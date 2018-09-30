#!/bin/bash

curl -kL "https://bootstrap.pypa.io/get-pip.py" | sudo python
cd $HOME

# ansible expectモジュールが使えるようにする(ansibleの仮想環境ではなくローカルに必要)
sudo pip install pexpect

# pythonの仮想環境起動
virtualenv venv
source $HOME/venv/bin/activate

# ansibleインストール
pip install ansible
ansible --version

