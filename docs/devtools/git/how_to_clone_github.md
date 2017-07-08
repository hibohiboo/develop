# githubへのつなぎ方

## clone

以下のコマンドを入力するとgithubからプロジェクトをcloneできる。

```bash
git clone git@github.com:kendai-crowngames/tyrano-online.git
```

ただし、cloneした後にpushするために色々と設定が必要。  
以下に、行っておくべき設定を記載する。

## sshの設定

### 暗号鍵の設置

googleドライブの`sshkey/crowngames`ファイルを`~/.ssh`フォルダにコピーする。

#### ~/.sshフォルダが分からない場合

* gitbashを起動
* `pwd ~/.ssh`でフォルダのパスが分かる
* `cd ~/.ssh`でフォルダに移動してから`explorer .`でフォルダが開く。

### ホストの設定

`~/.ssh/config`ファイルに以下を追記

```
Host github.com.crowngames
  HostName github.com
  User git
  Port 22
  IdentityFile ~/.ssh/crowngames
  TCPKeepAlive yes
  IdentitiesOnly yes
```

### ssh認証の保存

crowngamesの秘密鍵を保存。

```bash
ssh-add ~/.ssh/crowngames
```

#### ssh-agentの起動

bashを起動したときに立ち上げるように設定

```bash
cp docs/prepare/data/.bashrc
```


## github認証情報の保存

### windowsの場合

キャッシュを有効にするコマンド

```bash
git config --global credential.helper wincred
```

## gitの設定

メールとパスワードを設定していなければ、以下のコマンドで設定する。

```bash
git config --global user.name "{username}"
git config --global user.email {mailadress}
```


## 参考

[Qiita-GitHubの複数アカウントを使い分けるならSSHよりhttpsの方がいいんじゃね？という話][*1]  
[Caching your GitHub password in Git][*2]
[ssh-agent][*3]
[使い始める - 最初のGitの構成][*4]

[*1]:http://qiita.com/zaki-yama/items/bfb0c2bef516af58c3fa
[*2]]:https://help.github.com/articles/caching-your-github-password-in-git/
[*3]:https://help.github.com/articles/working-with-ssh-key-passphrases/
[*4]:https://git-scm.com/book/ja/v1/%E4%BD%BF%E3%81%84%E5%A7%8B%E3%82%81%E3%82%8B-%E6%9C%80%E5%88%9D%E3%81%AEGit%E3%81%AE%E6%A7%8B%E6%88%90