#!/bin/bash

# https://kazuhira-r.hatenablog.com/entry/2019/01/09/231800
cd $HOME
python3 -m venv venv3
source $HOME/venv3/bin/activate
pip3 install ansible
ansible --version