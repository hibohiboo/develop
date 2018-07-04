FROM node:10.5.0

# Add Tini nodeはpid 1で動くようにできていないのでpid1でtiniを動かす。
# http://ngzm.hateblo.jp/entry/2017/08/22/185224
ENV TINI_VERSION v0.15.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]


# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# elmインストール
RUN yarn add  elm
RUN yarn add elm-test 
RUN yarn add elm-css 
RUN yarn add elm-live

# elm 高速化
ADD ./ensure_libsysconfcpus.sh /app/ensure_libsysconfcpus.sh
ADD ./replace_elm_make.sh /app/replace_elm_make.sh

RUN /app/ensure_libsysconfcpus.sh
RUN /app/replace_elm_make.sh

# chokidarのポーリング設定
RUN sed -i -e "s/\(ignoreInitial: true,\)/\1\n    usePolling: true, /g" /app/node_modules/elm-live/source/elm-live.js

# livereloadのホストが0.0.0.0だとwindowsではうまく動作しない
# RUN sed -i -e "s/host: args.host,/host: '192.168.50.10',/g" /app/node_modules/elm-live/source/elm-live.js
# RUN sed -i -e "s/local: true\s+})/local: false});liveInjector.host='192.168.50.10';/g" /app/node_modules/budo/lib/middleware.js
RUN sed -i -e "s/if (live.host) liveInjector.host = live.host/liveInjector.host ='192.168.50.10'/g" /app/node_modules/budo/lib/middleware.js
