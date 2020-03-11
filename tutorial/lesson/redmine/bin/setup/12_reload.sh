#!/bin/bash

docker exec redmine bundle exec rails runner 'Rails.cache.clear' && \
docker exec redmine passenger-config restart-app /usr/src/redmine