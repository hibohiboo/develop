#!/bin/bash

# 一般的なウェブのフォーム (escapeなし)
curl --http1.0 -d title="The Art of Community" -d author="Jono Bacon" http://192.168.50.10:18888/greeting

# 一般的なウェブのフォーム (escapeあり:RFC3986) RFC3986はRFC1866と違い、スペースを+ではなくて%20に変更する。
curl --http1.0 --data-urlencode title="First PHP & MySQL" --data-urlencode author="Lynn Beighley, Michael Morrison" http://192.168.50.10:18888/greeting
