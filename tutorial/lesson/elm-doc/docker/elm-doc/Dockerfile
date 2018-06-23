FROM node:10.5.0
RUN \
  apt-get update && \
  apt-get install -y python3 python3-dev python3-pip 
RUN apt-get install locales
# && rm -rf /var/lib/apt/lists/*
RUN echo "ja_JP UTF-8" > /etc/locale.gen
RUN locale-gen
RUN pip3 install --upgrade pip setuptools
RUN pip3 install python-magic
RUN pip3 install elm-doc
ENV LC_ALL ja_JP.UTF-8
ENV LANG ja_JP.UTF-8
WORKDIR /app

RUN npm init -y
RUN yarn add  elm
