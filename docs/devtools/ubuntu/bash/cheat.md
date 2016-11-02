# cheat sheet bash command

## sudo init 0

電源を切る  
[*1][*1]

## lshw

ハードウェアの情報を知る [*2][*2]

```bash
lshq -C network # ネットワークカードの情報を知る
```
## dmesg

```bash
dmesg | grep enp
```

ネットワークの情報を知る。

## 参考

[init 0][*1]
[ 【解決した】VagrantでCentOS7のVMを作ったらネットワーク設定でコケた（固定IP割り当てに失敗）][*3]

[*1]:http://aoi-f.blog.so-net.ne.jp/2010-10-02
[*2]:http://linux.just4fun.biz/%E9%80%86%E5%BC%95%E3%81%8DUNIX%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89/%E3%83%8F%E3%83%BC%E3%83%89%E3%82%A6%E3%82%A7%E3%82%A2%E6%83%85%E5%A0%B1%E3%82%92%E5%8F%96%E5%BE%97%E3%81%99%E3%82%8B%E3%83%BBlshw%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89.html
[*3]:https://utano.jp/entry/2014/11/vagrant_centos7_network_error/
