#!/bin/bash -x


# venv上のawscliで実行用に追加
source /home/vagrant/venv/bin/activate

# ポリシーをLamda実行ロールに追加する
aws --profile admin iam attach-role-policy \
    --role-name learnjs_lambda_exec \
    --policy-arn arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess
