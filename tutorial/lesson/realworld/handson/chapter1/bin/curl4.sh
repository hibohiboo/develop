#!/bin/bash

# Windows7 の Internet Explorer10に見せかけ
curl -v --http1.0 -A "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)" http://192.168.50.10:18888/greeting

# 上と同義
curl -v --http1.0 -H "User-Agent: Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)" http://192.168.50.10:18888/greeting
