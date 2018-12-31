# blog

## 環境作成

* これまでやっていたページはいったん削除

[この時点のソース](https://github.com/hibohiboo/wasureta/tree/f1d8125275963521c0ecd7fcd0147c7d4120f020/nuxt)

## スキャフォールディング

### プロジェクトの作成

* 91Pの手順に従ってインストール
* yarn までやってくれたので、案の定エラー。

```
vagrant@vagrant[master]:/vagrant/project/wasureta/nuxt$ ./bin/blogs/create-project.sh
> Generating Nuxt.js project in /app/src/mypage
? Project name mypage
? Project description my first-rate Nuxt.js project
? Use a custom server framework none
? Use a custom UI framework element-ui
? Choose rendering mode Universal
? Use axios module yes
? Use eslint yes
? Use prettier yes
? Author name hibo
? Choose a package manager yarn
Initialized empty Git repository in /app/src/mypage/.git/
yarn install v1.12.3
info No lockfile found.
[1/4] Resolving packages...
warning eslint > file-entry-cache > flat-cache > circular-json@0.3.3: CircularJSON is in maintenance only, flatted is its successor.
[2/4] Fetching packages...
info fsevents@1.2.4: The platform "linux" is incompatible with this module.
info "fsevents@1.2.4" is an optional dependency and failed compatibility check. Excluding it from installation.
[3/4] Linking dependencies...
warning " > element-ui@2.4.11" has unmet peer dependency "vue@^2.5.2".
warning " > eslint-loader@2.1.1" has unmet peer dependency "webpack@>=2.0.0 <5.0.0".
warning " > eslint-plugin-vue@4.7.1" has incorrect peer dependency "eslint@^3.18.0 || ^4.0.0".
error An unexpected error occurred: "EPROTO: protocol error, symlink '../../../parser/bin/babel-parser.js' -> '/app/src/mypage/node_modules/@babel/core/node_modules/.bin/parser'".
info If you think this is a bug, please open a bug report with the information provided in "/app/src/mypage/yarn-error.log".
info Visit https://yarnpkg.com/en/docs/cli/install for documentation about this command.

  To get started:

    cd mypage
    yarn run dev

  To build & start for production:

    cd mypage
    yarn run build
    yarn start
```

### yarnのやりなおし

* docker-composeを書き換えて、やりなおし。

```
vagrant@vagrant[master]:/vagrant/project/wasureta/nuxt$ ./bin/blogs/first-install-package.sh
yarn install v1.12.3
info No lockfile found.
[1/4] Resolving packages...
warning eslint > file-entry-cache > flat-cache > circular-json@0.3.3: CircularJSON is in maintenance only, flatted is its successor.
[2/4] Fetching packages...
info fsevents@1.2.4: The platform "linux" is incompatible with this module.
info "fsevents@1.2.4" is an optional dependency and failed compatibility check. Excluding it from installation.
[3/4] Linking dependencies...
warning " > element-ui@2.4.11" has unmet peer dependency "vue@^2.5.2".
warning " > eslint-loader@2.1.1" has unmet peer dependency "webpack@>=2.0.0 <5.0.0".
warning " > eslint-plugin-vue@4.7.1" has incorrect peer dependency "eslint@^3.18.0 || ^4.0.0".
[4/4] Building fresh packages...
success Saved lockfile.
Done in 29.41s.
```

[この時点のソース](https://github.com/hibohiboo/wasureta/tree/dfd16f5ca97101e14a0da9072fda9026a2001442/nuxt)

## 起動

* docker用のポーリング設定をnuxt.config.jsに行って起動

```
vagrant@vagrant[master]:/vagrant/project/wasureta/nuxt$ ./bin/up.sh
Starting docker_nuxt_1 ... done
Attaching to docker_nuxt_1
nuxt_1  | yarn run v1.12.3
nuxt_1  | $ nuxt
nuxt_1  | ℹ Preparing project for development                                   01:04:52
nuxt_1  | ℹ Initial build may take a while                                      01:04:52
nuxt_1  | ✔ Builder initialized                                                 01:04:52
nuxt_1  | ✔ Nuxt files generated                                                01:04:52
nuxt_1  | ℹ Compiling Client                                         webpackbar 01:04:53
nuxt_1  | ℹ Compiling Server                                         webpackbar 01:04:53
nuxt_1  | ✔ Server: Compiled successfully in 8.11s                   webpackbar 01:05:01
nuxt_1  | ✔ Client: Compiled successfully in 9.60s                   webpackbar 01:05:02
nuxt_1  | ℹ Waiting for file changes                                            01:05:02
nuxt_1  | ℹ Listening on: http://172.18.0.2:3000                                01:05:02
╚Gracefully stopping... (press Ctrl+C again to force)
Stopping docker_nuxt_1 ... done
```
[この時点のソース](https://github.com/hibohiboo/wasureta/tree/e01765b2d79a145c5aeacd3668ac5e617fee6933/nuxt)


## 参考

[Nuxt.js ビギナーズガイド][*0]


[*0]:https://nuxt-beginners-guide.elevenback.jp/examples/