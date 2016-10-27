# GIT

バージョン管理にはgitを使用する。  
[*1][*1]

## 使用バージョン

git for windows 2.10.1

## コマンド

### githubにpush

```bash
git remote add origin git@github.com:hibohiboo/develop.git
git push -u origin master
```

### commitを行うまで

```bash
git add hogefile                # ファイルをステージに追加
git commit -m "commit message"  # ステージに追加されたファイルをコミットする
```

hogefile に . を指定すると全ての変更を追加する。

### ステージングから外す

```bash
git rm --cached hogefile
```

[*2][*2]

## 参考サイト

[git ダウンロードサイト][*1]

[rm参考][*2]

[*1]:https://git-scm.com/download/win
[*2]:http://qiita.com/megu_ma/items/a438a71c84145f14d04e