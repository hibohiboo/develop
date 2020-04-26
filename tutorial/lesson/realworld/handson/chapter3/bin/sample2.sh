#!/bin/bash

# EncodeはRFC3986
curl -G --data-urlencode "query=hello world" http://192.168.50.10:18888

# GET /?query=hello%20world HTTP/1.1
# Host: 192.168.50.10:18888
# Accept: */*
# User-Agent: curl/7.69.1