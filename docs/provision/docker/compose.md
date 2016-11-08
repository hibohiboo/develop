# docker compose

## コンテナのリンク

例えば、identidockコンテナからhttp://dnmonster/
でdnmonsterコンテナにアクセスする場合、以下のようにする。

コマンドライン

```bash
$ docker run -d ---name dnmonster amouat/dnmonster:1.0
$ docker run --link dnmonster:dnmonster identidock
```

または、docker-compose.yml

```
identidock:
  build: .
  links:
   - dnmonster

dnmonster:
  image: amouat/dnmonster:1.0
```


## 参考

[Docker Compose - docker-compose.yml リファレンス][*1]
[Docker-ComposeでGitLabとRedmineとJenkinsを立ち上げる][*2]

[*1]:http://qiita.com/zembutsu/items/9e9d80e05e36e882caaa
[*2]:http://qiita.com/nexkeh/items/02a4d6c33d884bda1b23