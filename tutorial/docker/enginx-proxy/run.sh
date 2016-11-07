#!/bin/bash

# https://blog.1q77.com/2016/02/nginx-proxy-and-docker-gen/
# https://suin.io/531

docker run \
    --detach \
    --name nginx-proxy \
    --publish 80:80 \
    --publish 443:443 \
    --volume /var/run/docker.sock:/tmp/docker.sock:ro \
    --volume /certs:/etc/nginx/certs:ro \
    --restart always \
    --log-opt max-size=5m \
    --log-opt max-file=10 \
    jwilder/nginx-proxy