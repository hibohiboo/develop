#!/bin/bash

curl -X POST \
-H "Authorization: Bearer "$(gcloud auth application-default print-access-token) \
-H "Content-Type: application/json; charset=utf-8" \
-d @/data/test.json  \
https://texttospeech.googleapis.com/v1/text:synthesize \
-o /response/`date +%Y%m%d-%H%M%S`.json