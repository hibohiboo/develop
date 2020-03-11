FROM python:3.6.9-alpine3.10
RUN apk update
RUN apk add  curl tar

# https://cloud.google.com/sdk/docs/quickstart-linux?hl=en
WORKDIR /usr/src/gcp
RUN curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-255.0.0-linux-x86_64.tar.gz
RUN tar zxvf google-cloud-sdk-255.0.0-linux-x86_64.tar.gz google-cloud-sdk
RUN apk add bash
COPY .bashrc /root/.bashrc
RUN /usr/src/gcp/google-cloud-sdk/install.sh

