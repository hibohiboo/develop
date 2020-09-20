# 仮想環境設定メモ

## 手順

### 1. chocolatey のインストール

#### 1-1. PowerShell を開く

Windows のコンソールである Power Shell を管理者権限で開く。
スタートボタンの上にマウスを合わせて右クリックでスタートコマンドが開くので、「Windows PowerShell(管理者)(A)」を選択。
もしくは、[win]+[x]キー,[a]をキーボードで入力。

![](img/2019-10-19-14-44-45.png)

すると、「このアプリがデバイスに変更を加えることを許可しますか？」とメッセージがでるので「はい」を選択。
以下のようなコンソールが表示され、入力できるようになる。

![](img/2019-10-19-14-52-03.png)

#### 1-2. インストール

コンソールに以下のコマンドを入力して[Enter]

```
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

### 2. git virtualbox vagrant のインストール

#### 2-1. git virtualbox vagrant のインストール

コンソールに以下のコマンドを入力して[Enter]

```
cinst -y git virtualbox vagrant
```

ダウンロードしてインストールしている旨の英語が流れていく。
止まっていたら、時々[Enter]キーを押してやるとよい。
終わったら windows を再起動する。

#### 2-2. vagrant のプラグインのインストール

```
vagrant plugin install vagrant-vbguest
```

### 3. git clone

### 4. vagrant up

clone したフォルダで、右クリックをして gitbash のコンソールを開く。
そこに以下のコマンドを入力。

```
vagrant up
```

2 回、「このアプリがデバイスに変更を加えることを許可しますか？」とメッセージがでるので、2 回とも「はい」を選択。
ここから、仮想環境の構築がはじまるのでコーヒーでも淹れて待つ。

失敗した場合、以下のコマンドを何度か繰り返して、failed=0 になるまで待つ。

```
vagrant provision
```

![](img/2019-10-19-18-10-51.png)

## 接続の確認

以下の URL にアクセス
https://192.168.7.25/

## 詳細

### インストールしたツールについて

- chocolatey ... windows のパッケージ管理システム
- git ... バージョン管理システム
- virtualbox ... 仮想環境作成システム
- vagrant ... 仮想環境の設定を簡単にしてくれるツール

### Vagrantfile について

- `vagrant ssh`コマンドで仮想環境のサーバ上にログインできる。
- 仮想環境上では/vagrant ディレクトリが、Vagrantfile の置かれているフォルダとなる。つまり、/vagrant/Vagrantfile のようになっている。
- docker で nginx が動いている。トラブルがあったときは、ここを確認するとよい。
  - `cd /vagrant/virtual-environment/provision/docker`で docker のディレクトリに移動
  - `docker-compose build`で docker コンテナのビルド確認
  - `docker-compose stop`で現在動いているコンテナの停止
  - `docker-compose up`で再起動。ログを確認。

### docker について

以下は LaraDock の docker 設定を持ってきている。


## 参考

[chocolatey instration](https://chocolatey.org/docs/installation)
[laradock](https://github.com/laradock/laradock)
[Laradock の Nginx を SSL 化する](https://qiita.com/osakana9114/items/48fb03e51e23dd02871c)
