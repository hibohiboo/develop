#!/bin/bash

mkdir --parents --verbose /srv/redmine/config && \
cat << "_EOF_" > /srv/redmine/config/additional_environment.rb
config.cache_store = :mem_cache_store, "memcached"
_EOF_