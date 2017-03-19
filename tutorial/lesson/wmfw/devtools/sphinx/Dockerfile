FROM ubuntu:16.04

RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install -y python-sphinx make

COPY build.sh /root/

CMD ["/bin/sh", "/root/build.sh"]