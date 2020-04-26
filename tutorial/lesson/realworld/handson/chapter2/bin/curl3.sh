#!/bin/bash

# 圧縮方法を指定
# -H "Accept-Encoding: br, deflate, gzip"
curl -v --http1.0 --compressed http://192.168.50.10:18888/greeting
