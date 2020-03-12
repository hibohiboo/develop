#!/bin/bash

cat /response/20200312-110838.json | jq .audioContent -r > /base64/test.txt
