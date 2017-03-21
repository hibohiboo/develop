FROM ubuntu:16.04

RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install -y python-sphinx make

# http://qiita.com/seibe/items/36cef7df85fe2cefa3ea
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g jsdoc

COPY ./source/ /root/source
COPY build.sh /root/

CMD ["/bin/sh", "/root/build.sh"]