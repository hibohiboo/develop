# ELKスタック

## 概要

以下のロギング用ツールを動作させた環境

### Elasticsearch

テキスト検索エンジン。大量のデータを扱えるよう、複数のノードにスケールできる。

### Logstash

生のログを読み、パース、フィルタリングした後に他のサービスに転送。

### Kibana

Elasticsearchに対するグラフィカルインターフェース。  
Elasticsearchに対してクエリを実行し、結果をグラフとして可視化。

### Logspout

Docker専用ツール。DockerAPIを使って動作中のコンテナのログを送信できる。
Logstash用のコンテナにlogstashアダプタは含まれていないのでインストールが必要。


## 参考

[logspout][*1]
[logspout-logstash][*2]
[メモリの必要要件が4Gのもよう][*3]

[*1]:https://github.com/gliderlabs/Logspout
[*2]:https://github.com/looplab/logspout-Logstash
[*3]:http://snickerjp.blogspot.jp/2016/06/elk-elasticsearch-kibana-beatsfilebeat.html