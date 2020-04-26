#!/bin/bash

# -v より詳細な情報を表示
curl -v --http1.0 -H "X-Test: Hello" http://192.168.50.10:18888/greeting
