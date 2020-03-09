#!/bin/bash

cat << "_EOF_" > /srv/redmine/Gemfile.local
gem 'dalli'
_EOF_