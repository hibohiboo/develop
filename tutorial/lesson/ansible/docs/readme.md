## 手順

### 仮想環境の立ち上げ
まずはそれぞれの仮想環境を立ち上げておく

```
cd controll && vagrant up
cd targets && vagrant up
```

### 鍵の登録

コントロールサーバで作成した公開鍵をターゲットサーバに登録する

```
./controll/bin/run.sh add-publickey.sh
```



## 参考

[ansible expect][*1]
[公開鍵を使う][*2]
[Ansible2.xのexpectを使ってAnacondaをインストールする][*3]
[Vagrantで自分の作成した公開鍵と秘密鍵を使う方法][*4]
[Small Office & Simple IT][*5]
[https://dev.mysql.com/doc/mysql-yum-repo-quick-guide/en/][*6]
[redmine オレオレ][*7]
[Rack,Unicorn,Nginxの連携について][*8]
[nginxだけでWordPressを動かすための設定][*9]

[*1]:https://qiita.com/nyk0401/items/f0fdbdbadf61e1217dec
[*2]:https://qiita.com/t_732_twit/items/2303a0c3f27c288382c5
[*3]:https://tkn4416.hatenablog.com/entry/2018/03/14/075533
[*4]:https://program.g.hatena.ne.jp/halflite/20180127/provisioning_mysql_server
[*5]:https://usado.jp/spdsk/2018/02/28/post-3370/
[*6]:https://dev.mysql.com/doc/mysql-yum-repo-quick-guide/en/
[*7]:https://qiita.com/0ta2/items/c7864ca8052180343f0c#_reference-31bd363c780a14be0d18
[*8]:https://qiita.com/takahiro1127/items/fcb81753eaf381b4b33c
[*9]:https://lealog.hateblo.jp/entry/2012/03/25/225914
