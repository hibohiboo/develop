FROM node:10.5.0
RUN \
  apt-get update && \
  apt-get install -y python3 python3-dev python3-pip python-virtualenv \
  locales \
  && rm -rf /var/lib/apt/l ists/*
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
RUN yarn elm package install elm-lang/core -y

# 普通に実行すると、overlay_elm_packageのパスが取得できない。
RUN sed -i -e "s/__path__/\[\"\/usr\/local\/lib\/python3\.4\/dist-packages\"\]/" /usr/local/lib/python3.4/dist-packages/elm_doc/__init__.py

RUN elm-doc . --output docs
