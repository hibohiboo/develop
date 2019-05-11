#!/bin/bash

# echo $PATHは以下の結果となり、/usr/local/binは含まれていない。
# /usr/local/sbin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin
/usr/local/bin/python3.7 -V

# curl -kL "https://bootstrap.pypa.io/get-pip.py" | sudo python
# cd $HOME
# virtualenv venv
# source $HOME/venv/bin/activate
# pip install ansible
# ansible --version