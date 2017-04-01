FROM python:3.6
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y git

RUN npm install -g jsdoc
RUN pip install git+https://github.com/sphinx-doc/sphinx@stable

# jsdocのautodocを扱えるようにするプラグイン
RUN pip install 'sphinx-js>=1.5,<2.0'
# WORKDIR /root/source/site-packages
# RUN git clone --depth=1 https://github.com/erikrose/sphinx-js.git

# マークダウン記法を可能にするプラグイン
RUN pip install recommonmark 
WORKDIR /root
COPY ./source/ /root/source
COPY build.sh /root/

CMD ["/bin/sh", "/root/build.sh"]