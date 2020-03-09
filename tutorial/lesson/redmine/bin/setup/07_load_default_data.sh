#!/bin/bash

docker exec redmine bundle exec rake redmine:load_default_data RAILS_ENV=production REDMINE_LANG=ja
