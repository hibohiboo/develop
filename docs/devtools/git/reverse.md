# git 逆引き

## 設定を確認したい

```bash
git config --list
```

[*1][*1]

## 名前とEmailを設定する

最初に行うこと

```bash
git config --global user.name "hogename"
git config --global user.email "hoge@hoge.com"
```

## ブランチを切る

```bash
git checkout -b hogebranch
```

## ブランチを切り替える

```bash
git checkout hogebranch
```

[*1][*1]

## 参考

[gitを使い始める][*1]

[*1]:https://git-scm.com/book/ja/v1/%E4%BD%BF%E3%81%84%E5%A7%8B%E3%82%81%E3%82%8B-%E6%9C%80%E5%88%9D%E3%81%AEGit%E3%81%AE%E6%A7%8B%E6%88%90