#!/bin/bash 

source "/vagrant/tutorial/lesson/node/env.conf"

imageName="hibo/node"
containerName="node"
host_src_dir="/vagrant/tutorial/lesson/node"
container_src_dir="/home/vagrant"
docker_dir="${path_Dockerfile_dir}"

# -t: docker側の標準出力をホストの標準出力につなげる。
# -i: ホスト側のキーボードで打った文字をコンテナに送る
# -p:ポートフォワディング ホスト側：コンテナ側
# -e:環境変数
# -u:user
# -v: ディレクトリ共有
# -w: ワークディレクトリ
run(){
  docker run --name $containerName --rm -it \
             -p 3000:3000 \
             -e "NODE_ENV=production" \
             -v $host_src_dir:$container_src_dir \
             $imageName 
}

run_d(){
  docker run --name $containerName -d -i \
             -p 3000:3000 \
             -e "NODE_ENV=development" \
             -v $host_src_dir:$container_src_dir \
             $imageName
}

run_i(){
  docker run --name $containerName -d -i \
             -p 3000:3000 \
             -e "NODE_ENV=development" \
             -v $host_src_dir:$container_src_dir \
             $imageName \
              /bin/sh -c "while true; do echo hello world; sleep 1; done"
}

# トランスパイル。
# build & copy
run_t(){
  docker run --name $containerName  --rm -it \
             -m "1024M" \
             -e "NODE_ENV=development" \
             -v $host_src_dir:$container_src_dir \
             -v $host_build_dir:$container_build_dir \
             $imageName \
              /bin/sh -c "cd /home/vagrant/angular2-webpack-starter && npm run build:dev && cp -r /home/vagrant/angular2-webpack-starter/dist /home/vagrant/share/build/"
}

checkBeforeContainer $containerName
default $#

#option -b -r -d -i -t
while getopts brdit opt
do
  main ${opt} $docker_dir $imageName $containerName
done


