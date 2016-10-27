# Docker 逆引き

## 停止したコンテナのクリーンアップ

```bash
docker rm -v $(docker ps -aq -f status=exited)
```

## 参考

Docker オライリー
[dockerチートシート][*1]

[*1]:http://qiita.com/voluntas/items/68c1fd04dd3d507d4083
