#!/bin/bash

curl -kL "https://bootstrap.pypa.io/get-pip.py" | sudo python
cd $HOME
virtualenv venv
source $HOME/venv/bin/activate
pip install ansible
ansible --version