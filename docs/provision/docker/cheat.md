# Docker 

## docker rm

一つ以上のコンテナを削除

| オプション  | 意味 |
| :--:        | :--  |
| -v          | コンテナが作成したボリュームを削除 |
| -f          | 実行中のコンテナも削除             |

## docker ps

現在のコンテナ群に関する、名前、ID、ステータスといった高レベルの情報を提供する。

| オプション  | 意味 |
| :--:        | :--  |
| -a          | 実行中のコンテナだけでなく、すべてのコンテナの情報を取得 |
| -f          | 実行中のコンテナも削除             |
| -q, --quiet | 名前のみを表示 |
| status=     | status (created 	restarting 	running 	paused 	exited 	dead) |

## docker-comose up

Composeのファイルで定義された全てのコンテナを起動。  
出力されるログを集約。

| オプション | 意味                  |
| --         | :--                   |
| -d         |バックグラウンドで動作 |

## docker-compose build

Dockerfiles群から生成されるイメージを再構築する。  
upコマンドはイメージの更新はしないので、
イメージの更新はこのコマンドが必要。

## docker-compose ps

コンテナの状態の情報を提供する。

## docker-compose run

単発のコマンドを実行するためにコンテナを起動

```
$ docker-compose run --rm hogeContainer bash
```

| オプション | 意味                  |
| --         | :--                   |
| --rm       |実行し終わったら削除   |


## docker-compose logs

Composeが管理しているコンテナのログをカラー付きで集約して出力。

## docker-compose stop

コンテナを停止

## docker-compose rm

停止しているコンテナを削除。

| オプション | 意味                             |
| --         | :--                              |
| -V         | dockerが管理するボリュームを削除 |



## 参考

[Docker コマンドラインリファレンス][*2]
Docker オライリー
[dockerチートシート][*1]

[*1]:http://qiita.com/voluntas/items/68c1fd04dd3d507d4083
[*2]:https://docs.docker.com/engine/reference/commandline

