# Docker 逆引き

## 停止したコンテナのクリーンアップ

```bash
docker rm -v $(docker ps -aq -f status=exited)
```

## コンテナ群の停止と削除

```bash
$ docker stop $(docker ps -q)
$ docker rm $(docker ps -aq)
```

## ランダムにポートを割り振る

```bash
$ docker run -P --name hogeName hogeContainer
$ docker port hogeName
```

## ユーザをdockerファイル中で割り振ること

そうしないと、プロセスがコンテナないでrootとして実行される。  
UIDはコンテナとホストで共通のため、ホストのルート権限も手に入れてしまう。

```
USER hogeUser
```

## ロギング

```bash
$ docker logs hogeContainer
```

動作中のコンテナからログをストリーミング

```bash
$ docker logs -f ahogeContainer
```

デフォルトのログインログはSTDOUTとSTDERRのみ。  
ログローテーションの機能がないのでディスクドライブの空き領域がコンテナに食い尽くされるおそれがある。

 `--log-driver`でロガーを変更出来る。
| ロガー    |                                           |
| --        | :--                                       |
| json-file | デフォルト                                |
| syslog    | syslogドライバ                            |
| journald  | systemdジャーナル用ドライバ               |
| gelf      | Graylog Extended Log フォーマットドライバ |
| fluentd   | fluentdにフォワード                       |
| none      | ロギングを無効にする                      |

## 参考

Docker オライリー
[dockerチートシート][*1]

[*1]:http://qiita.com/voluntas/items/68c1fd04dd3d507d4083
