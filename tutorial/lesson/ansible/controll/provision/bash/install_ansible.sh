#!/bin/bash

curl -kL "https://bootstrap.pypa.io/get-pip.py" | sudo python
cd $HOME
# pythonの仮想環境起動
virtualenv venv
source $HOME/venv/bin/activate

# ansibleインストール
pip install ansible
ansible --version

# ansible expectモジュールが使えるようにする
pip install expects