#!/bin/bash -xe

# Update with optional user data that will run on instance start.
# Learn more about user-data: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html

# https://zenn.dev/moriso/articles/491b6926ad1f954b191a
# JREをダウンロード
yum update -y
yum install java-1.8.0-openjdk.x86_64 -y

# jmetetをダウンロード
cd /home/ec2-user
wget https://downloads.apache.org//jmeter/binaries/apache-jmeter-5.4.tgz
tar -xf apache-jmeter-5.4.tgz
# 所有者をec2-userに
chown -R ec2-user apache-jmeter-5.4