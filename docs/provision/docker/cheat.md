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

## 参考

[Docker コマンドラインリファレンス][*2]
Docker オライリー
[dockerチートシート][*1]

[*1]:http://qiita.com/voluntas/items/68c1fd04dd3d507d4083
[*2]:https://docs.docker.com/engine/reference/commandline

