# windows用開発ツールの設定

## エディタ

vscodeとatomを選択肢として考えてみる。

## パッケージマネージャ

chocolateyを使用。


~~powershellを起動。
[winキー] +[r] で「ファイル名を指定して実行」ダイアログを表示。
powershellと打ち込んでOK.~~

管理者権限でpowershellを起動。[ctrl]+[alt]+[del]でタスクマネージャを開く。

ファイル > 新しいタスクの実行

[このタスクに管理者権限を与えて実行します]にチェックをいれて、powershellと打ち込んでOK。

以下、powershellでインストール参考サイトをみて作業。

```bash
Get-ExecutionPolicy 
Set-ExecutionPolicy Unrestricted # 自分の環境ではRestrictだったため必要
# chocolatey のインストール
iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))
choco feature enable -n autoUninstaller
```

## Atom のインストール

クラス設計の画像エディタとしてAtomをインストールする。
powershell で以下を実行

```bash
cinst jdk8 -y     # plantumlのためにjavaをインストール
cinst graphviz -y # ユースケース図以外の画像の作成に必要
cinst atom -y     # atom本体のインストール
```

以下、コマンドプロンプトを立ち上げて実行

```bash
apm install plantuml-viewer
apm install language-plantuml
```

## virtualbox/vagrantのインストール

powershell で以下を実行

```bash
cinst virtualbox -y     # 仮想環境
cinst vagrant -y        # 仮想環境操作ツール
```


## 参考

[chocolatyインストール][*1]

[*1]:http://qiita.com/kitakitash/items/f62abeb4f103000d0ca2