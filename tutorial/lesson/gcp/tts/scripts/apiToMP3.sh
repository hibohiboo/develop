#!/bin/bash

curl -X POST \
-H "Authorization: Bearer "$(gcloud auth application-default print-access-token) \
-H "Content-Type: application/json; charset=utf-8" \
-d @/data/japan.json  \
https://texttospeech.googleapis.com/v1/text:synthesize | jq .audioContent -r | base64 -d > /mp3/japan.mp3