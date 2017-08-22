#!/bin/bash -x


# venv上のawscliで実行用に追加
source /home/vagrant/venv/bin/activate

# 利用可能なマネージドポリシーのリストを見る
aws --profile admin iam list-policies