#!/bin/bash

# 変数設定
bin_dir=$(cd $(dirname $0) && pwd)
composeFile=${1:-"docker-compose.yml"}
containerName=${2:-"elm-doc"}

# docker-composeの起動
cd $bin_dir/../docker && docker-compose -f $composeFile run $containerName /bin/bash -c "elm-doc . --output docs"
# docker cp /path/to/my-local-file.sql "$(docker-compose ps -q mycontainer)":/file-on-container.sql
docker cp ` cd $bin_dir/../docker && docker-compose ps -q $containerName`:/app/docs /vagrant/tutorial/lesson/elm-doc/docs/api/
