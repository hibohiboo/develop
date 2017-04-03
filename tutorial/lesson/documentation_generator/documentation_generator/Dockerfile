FROM python:3.6

# curlをインストール
RUN apt-get install -y curl

# node.jsをインストール
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs

# gitをインストール
RUN apt-get install -y git

# jsdocをインストール
RUN npm install -g jsdoc

# sphinxをインストール
RUN pip install git+https://github.com/sphinx-doc/sphinx@stable

# sphinxのマークダウン記法を可能にするプラグイン
RUN pip install recommonmark 

# esdocのインストール
RUN npm install -g esdoc

# 作業ディレクトリに移動
WORKDIR /root

# jsdocテンプレートminamiのインストール
RUN npm init -y
RUN npm install --save-dev minami

CMD ["/bin/sh", "/root/build.sh"]