#!/bin/bash

curl -kL "https://bootstrap.pypa.io/get-pip.py" | sudo /usr/local/bin/python3.7
cd $HOME
/usr/local/bin/virtualenv venv
source $HOME/venv/bin/activate
pip install ansible
ansible --version