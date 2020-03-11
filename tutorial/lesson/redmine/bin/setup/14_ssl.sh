#!/bin/bash

docker network create nginx-proxy && \
mkdir --parents --verbose /srv/nginx-proxy && \
cat << "_EOF_" > /srv/nginx-proxy/docker-compose.yml && cd /srv/nginx-proxy/ && \
docker-compose --project-directory /srv/nginx-proxy up --detach
version: '3.7'
services:
  nginx-proxy:
    container_name: ${NGINX_PROXY:-nginx-proxy}
    image: jwilder/nginx-proxy
    labels:
      - com.github.jrcs.letsencrypt_nginx_proxy_companion.nginx_proxy
    restart: always
    ports:
      - 80:80
      - 443:443
    volumes:
      - /srv/nginx-proxy:/etc/nginx/vhost.d
      - /srv/nginx-proxy:/usr/share/nginx/html
      - /srv/nginx-proxy/certs:/etc/nginx/certs:ro
      - /var/run/docker.sock:/tmp/docker.sock:ro
  letsencrypt:
    container_name: letsencrypt
    image: jrcs/letsencrypt-nginx-proxy-companion
    restart: always
    depends_on:
      - ${NGINX_PROXY:-nginx-proxy}
    volumes:
      - /srv/nginx-proxy:/etc/nginx/vhost.d
      - /srv/nginx-proxy:/usr/share/nginx/html
      - /srv/nginx-proxy/certs:/etc/nginx/certs:rw
      - /var/run/docker.sock:/var/run/docker.sock:ro
networks:
  default:
    name: ${NETWORK:-nginx-proxy}
_EOF_