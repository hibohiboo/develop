# Vagrant

仮想環境の作成にはvagrantを使用する。

## 使用バージョン

vagrant 1.8.6
virtual box 5.1.16

## コマンド

### 起動

```bash
$ vagrant up 
```

### 終了

```bash
$ vagrant halt
```

### ssh設定

最初に以下のコマンドを実行

```bash
$ vagrant ssh-config --host [myHost] >> ~/.ssh/config # [myHost]は任意の文字列
```

以降、vagrant ssh の代わりに以下でもログインできるようになる。

```bash
$ ssh myHost # sshコマンドでmyHostに接続
```

### 再プロビジョニング

```bash
$ vagrant provision
```

環境を変更したらこのコマンドで設定をしなおす。


### 起動時間が長すぎる件

gui=trueで確認して、
A start job is running for LSB: Raise network interfacesと言われた場合。
起動時にネットワークインターフェースを初期化しないようにすればよい

 CONFIGURTE_INTERFACES を noに。

## 参考

[vagrant ダウンロードサイト][*1]
[ssh 参考][*2]
[A start job][*3]
[VagrantFileを読もう(主にNetwork周り)][*4]

[*1]:https://www.vagrantup.com/downloads.html
[*2]:http://qiita.com/Sanche/items/43d615beef05cd9417e2
[*3]:http://www.k.nakao.name/noisefactory/2014/12/09/2014-12-09-post_554/
[*4]:http://hao03.github.io/blog/2014/07/16/vagrant-network/
