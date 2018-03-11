# ツール管理
## 前提条件

* bin/init.batを管理者権限で実行後であること
  * chocolateyがインストールされていること
  * gitがインストールされていること
  * vscodeがインストールされていること
* コマンドプロンプトまたはPower shellを管理者権限で起動すること。

## chocolateyコマンド

### リスト

```
choco list -lo
```

### インストール

```
cinst -y git
```

### アップデート

``` 
cup -y git
```

## vscodeコマンド

### 拡張一覧

```
code --list-extensions
```

### 拡張インストール

```
code --install-extension felixfbecker.php-debug
```

## 便利ツール

### plantuml UML作成ツール

```powershell
cinst -y jre8
cinst -y graphviz
code --install-extension jebbs.plantuml
```

#### プレビュー

以下の文字を新規ファイルに入力し、 alt + d 

```
@startuml
Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response

Alice -> Bob: Another authentication Request
Alice <-- Bob: another authentication Response
@enduml
```

## teraterm sshターミナル

```
cinst -y teraterm
```

#### 出力

ctrl + pでコントロール呼び出し。
以下を入力すると予測変換が出てくる。
カーソル位置のダイアログをエクスポートを選択。
pngやsvgなどを選べる。

```
> plantuml
```