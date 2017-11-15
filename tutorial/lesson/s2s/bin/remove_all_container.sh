#!/bin/bash

# 全てのdockerコンテナを止める
docker stop $(docker ps -q)

# 全てのdockerコンテナを削除
docker rm $(docker ps -aq)