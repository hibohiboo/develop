# docker-hubからnode入りコンテナを取得
# https://hub.docker.com/_/node/
FROM node:14.14.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app
RUN curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
RUN mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg
# https://stackoverflow.com/questions/58395566/lsb-release-command-not-found-in-latest-ubuntu-docker-container
RUN apt-get update && apt-get install -y lsb-release
# dockerはdebianが動作
RUN sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/debian/$(lsb_release -rs | cut -d'.' -f 1)/prod $(lsb_release -cs) main" > /etc/apt/sources.list.d/dotnetdev.list'
# RUN cat /etc/apt/sources.list.d/dotnetdev.list
# https://scribble.washo3.com/linux/debian%E3%81%A7sourcelist%E5%86%85%E3%81%AEhttps%E3%81%8C%E5%8F%96%E5%BE%97%E5%87%BA%E6%9D%A5%E3%81%AA%E3%81%84%E3%81%A8%E3%81%8D.html
RUN apt-get install -y apt-transport-https
RUN apt-get update && apt-get install -y azure-functions-core-tools-3 && apt-get clean all
