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

## adminerの確認

http://192.168.74.60/adminer.php?server=192.168.7.25&username=testuser_wp&db=testdb_wp
パスワードはwpDbP@ssw0rd


## 履歴

[wordpressをrootにインストールした時点の状態](https://github.com/hibohiboo/develop/tree/0789aaf2640c8b2dfca2e75ca0f605631bc491b5/tutorial/lesson/ansible/)


[wordpressをサブディレクトリにインストールしてadminerをいれた時点の状態](https://github.com/hibohiboo/develop/tree/7ce7d56a695ff667f0ab6b061ab6776697aeba09/tutorial/lesson/ansible/)

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
[NginxでWordPressを使う時の設定をまとめてみた][*10]
[NginxでWordPressをサブディレクトリに設置][*11]
[nginx と PHP-FPM の仕組みをちゃんと理解しながら PHP の実行環境を構築する][*12]
[RedmineをAnsibleでインストールする][*13]
[service environment][*14]
[Redmine 3.4をCentOS 7.0にインストールする手順][*15]
[debianのnginxでredmineをsubdirectoryで動作させたくなったら][*16]
[XSERVERでRuby on Railsを動かす その1][*17]
[Redmine - 個人的記録][*18]
[nginxの設定 その1][*19]
[nginxとunicornが連携しない][*20]

[*1]:https://qiita.com/nyk0401/items/f0fdbdbadf61e1217dec
[*2]:https://qiita.com/t_732_twit/items/2303a0c3f27c288382c5
[*3]:https://tkn4416.hatenablog.com/entry/2018/03/14/075533
[*4]:https://program.g.hatena.ne.jp/halflite/20180127/provisioning_mysql_server
[*5]:https://usado.jp/spdsk/2018/02/28/post-3370/
[*6]:https://dev.mysql.com/doc/mysql-yum-repo-quick-guide/en/
[*7]:https://qiita.com/0ta2/items/c7864ca8052180343f0c#_reference-31bd363c780a14be0d18
[*8]:https://qiita.com/takahiro1127/items/fcb81753eaf381b4b33c
[*9]:https://lealog.hateblo.jp/entry/2012/03/25/225914
[*10]:https://worklog.be/archives/3222
[*11]:https://owani.net/wordpress/subdirectory/445/
[*12]:https://qiita.com/kotarella1110/items/634f6fafeb33ae0f51dc
[*13]:http://www.torutk.com/projects/swe/wiki/Redmine%E3%82%92Ansible%E3%81%A7%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E3%81%99%E3%82%8B
[*14]:https://coreos.com/os/docs/latest/using-environment-variables-in-systemd-units.html
[*15]:http://blog.redmine.jp/articles/3_0/installation_centos/
[*16]:http://pojiropocket.hatenablog.com/entry/2017/07/18/125234
[*17]:https://www.nijitei.com/it/run_ruby_on_rails_on_xserver/
[*18]:https://nazuna.sakura.ne.jp/wiki/index.php?title=Redmine#.E3.82.B5.E3.83.96.E3.83.87.E3.82.A3.E3.83.AC.E3.82.AF.E3.83.88.E3.83.AA.E3.81.AE.E8.A8.AD.E5.AE.9A
[*19]:https://www.bnote.net/centos/nginx_conf01.html
[*20]:https://teratail.com/questions/27773