FROM python:3.7.4-alpine3.10
RUN apk update
RUN apk add  curl tar
WORKDIR /usr/src/gcp
RUN curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-255.0.0-linux-x86_64.tar.gz
RUN tar zxvf google-cloud-sdk-255.0.0-linux-x86_64.tar.gz google-cloud-sdk
# RUN adduser -D myuser
# USER myuser
RUN /usr/src/gcp/google-cloud-sdk/install.sh