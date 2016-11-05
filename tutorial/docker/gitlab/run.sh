#!/bin/bash

# sudo docker run --detach \
#     --hostname gitlab.example.com \
#     --publish 443:443 --publish 80:80 --publish 22:22 \
#     --name gitlab \
#     --restart always \
#     --volume /srv/gitlab/config:/etc/gitlab \
#     --volume /srv/gitlab/logs:/var/log/gitlab \
#     --volume /srv/gitlab/data:/var/opt/gitlab \
#     gitlab/gitlab-ce:latest


# step1
docker run --name gitlab-postgresql -d \
    --env 'DB_NAME=gitlabhq_production' \
    --env 'DB_USER=gitlab' --env 'DB_PASS=password' \
    --volume /srv/docker/gitlab/postgresql:/var/lib/postgresql \
    sameersbn/postgresql:9.4-12

# step2
docker run --name gitlab-redis -d \
    --volume /srv/docker/gitlab/redis:/var/lib/redis \
    sameersbn/redis:latest

# step3
docker run --name gitlab -d \
    --link gitlab-postgresql:postgresql --link gitlab-redis:redisio \
    --publish 10022:22 --publish 10080:80 \
    --env 'GITLAB_PORT=10080' --env 'GITLAB_SSH_PORT=10022' \
    --env 'GITLAB_SECRETS_DB_KEY_BASE=long-and-random-alpha-numeric-string' \
    --volume /srv/docker/gitlab/gitlab:/home/git/data \
    sameersbn/gitlab:8.4.2