#!/bin/bash

# ファイルの送信
curl --http1.0 -F title="The Art of Community" -F author="Jono Bacon" -F attachment-file=@../data/test.txt http://192.168.50.10:18888/greeting

# 送信ファイル名はローカルファイル名と同じ。形式も自動設定。
curl --http1.0 -F attachment-file=@../data/test.txt http://192.168.50.10:18888/greeting

# 形式は手動。
curl --http1.0 -F "attachment-file=@../data/test.txt;type=text/html" http://192.168.50.10:18888/greeting

# ファイル名は指定したファイル名を使用。
curl --http1.0 -F "attachment-file=@../data/test.txt;filename=sample.txt" http://192.168.50.10:18888/greeting
