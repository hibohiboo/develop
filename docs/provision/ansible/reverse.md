# ansible reverse

## git clone

```
- git: repo=git@github.com:seizans/ansible-tut.git
  dest=/path/to/dir version=master accept_hostkey=yes
```

## チェックしてから実行

```
- hosts: localhost
  tasks:
    - shell: test -e /tmp/hoge
      register: res
      always_run: yes
      failed_when: no
      changed_when: res.rc != 0

    - shell: uname -a > /tmp/hoge
      when: res|changed
```

[*2][*2]
[*5][*5]


### 自動返答

```
expect
```

[*4][*4]

## ファイルをコピーしたい

```
- copy: >
    src=foo.txt    
    dest=/tmp/foo.txt
    owner=root
    group=root
    mode=0755
```

[*8][*8]

## ディレクトリを作成したい

fileモジュールでstateパラメータにdirectoryと指定

[*9][*9]

## gitから取得

```
- git: repo=git@github.com:seizans/ansible-tut.git
  dest=/path/to/dir version=master accept_hostkey=yes
````

[*10][*10]

## リモートからリモートへコピー

リモートからリモートへファイルをコピーするモジュールがないのでシェル

```
- name: copy file
  shell: creates=/tmp/hoge.conf cp /tmp/hoge.conf /etc/hoge/hoge.conf
```

## 参考

[Ansible で git clone させる][*1]  
[Goの環境を作るAnsibleの設定をリファクタした][*2]
[apt][*3]
[自動返答][*4]
[Ansible の shell モジュールでチェックモードも考慮する][*5]
[はじめてAnsibleを使う人が知っておきたい7つのモジュール][*6]
[Ansibleでshellを実行させるときのノウハウ][*7]
[Ansibleでよく使うファイル操作モジュール][*8]

[git clone ansible ][*10]
[ansible のモジュール(ファイル操作等)をまとめてみました][*11]
[ansible リモートにあるファイルをリモートにコピーする][*12]
[Ansibleのmakeモジュールやnuarchiveモジュールを使ってGitをソースからインストールしてみる][*13]
[ansible make][*14]

[*1]:http://qiita.com/seizans/items/f5f052aec1592c47767f
[*2]:http://leko.jp/archives/823
[*3]:http://qiita.com/taisho6339/items/b6e19b8906b8d2a092e7
[*4]:http://qiita.com/ruby_kumagoro/items/4afdab4715dc85a7187a
[*5]:http://qiita.com/ngyuki/items/69c33065f7daa0cd571d
[*6]:https://www.infiniteloop.co.jp/blog/2013/08/ansible/
[*7]:http://qiita.com/chroju/items/ec2f7bb87d9ae3603c6a
[*8]:http://dev.classmethod.jp/server-side/ansible/ansible-file-modules-intro/
[*9]:http://qiita.com/hnakamur/items/b5a17d8cb289432014d5
[*10]:http://qiita.com/seizans/items/f5f052aec1592c47767f
[*11]:http://qiita.com/waterada/items/4e64cc6f810a92001c95
[*12]:http://yume-build.com/blog/archives/338
[*13]:http://qiita.com/olympic2020/items/623665d45d90a4fb1b98
[*14]:https://docs.ansible.com/ansible/make_module.html