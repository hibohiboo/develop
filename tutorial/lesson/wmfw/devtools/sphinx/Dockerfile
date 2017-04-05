FROM python:3.6
# RUN apt-get install -y curl
# RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
# RUN apt-get install -y nodejs
RUN apt-get install -y git

RUN pip install git+https://github.com/sphinx-doc/sphinx@stable

# マークダウン記法を可能にするプラグイン
RUN pip install recommonmark

# テーマ 
RUN pip install sphinx-rtd-theme
WORKDIR /root
COPY build.sh /root/

CMD ["/bin/sh", "/root/build.sh"]