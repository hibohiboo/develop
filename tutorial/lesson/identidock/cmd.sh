#!/bin/bash
set -e

if [ "$ENV" = 'DEV' ]; then
  echo "Runnning Develop Server"
  exec python "identidock.py"
elif [ "$ENV" = 'UNIT' ]; then
  echo "Running Unit Tests"
  exec python "tests.py"
else
  echo "Runnning Production Server"
  exec uwsgi --http 0.0.0.0:9000 --wsgi-file /app/identidock.py \
             --callable app --stats 0.0.0.0:9191
fi