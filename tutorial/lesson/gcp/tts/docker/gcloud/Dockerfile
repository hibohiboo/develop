FROM python:3.8.2-alpine3.11
RUN apk update
RUN apk add  curl tar

# TTS用の設定
# https://cloud.google.com/text-to-speech/docs/quickstart-protocol?authuser=1#synthesize_audio_from_text
COPY ./private/private.json /private/private.json
RUN export GOOGLE_APPLICATION_CREDENTIALS="/private/private.json"

# https://cloud.google.com/sdk/docs/quickstart-linux?hl=en
WORKDIR /usr/src/gcp
RUN curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-284.0.0-linux-x86_64.tar.gz
RUN tar zxvf google-cloud-sdk-284.0.0-linux-x86_64.tar.gz google-cloud-sdk
RUN apk add bash
COPY .bashrc /root/.bashrc
RUN /usr/src/gcp/google-cloud-sdk/install.sh

# jsonから値を取得するためのパッケージ
RUN apk add jq
