#!/bin/bash

docker exec redmine bundle install && \
docker exec redmine passenger-config restart-app /usr/src/redmine