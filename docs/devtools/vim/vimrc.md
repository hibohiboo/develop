# vimrc

## .vimrc

ユーザーのホームディレクトリ以下に.vimrcファイルを置く。
そうすることで、Vimを起動した時に自動的に.vimrcファイルを読み込む。

## 設定

```bash
set encoding=utf-8   # ファイル読み込み時の文字コードの設定
scriptencoding utf-8 # マルチバイト文字を使う場合の設定
```

## プラグイン

`/home/vagrant/.vim/pack/myHoge/opt/hogePlugin`以下にプラグインをダウンロード。

.vimrcに以下を記述
```
:packadd hogePlugin
```

`/home/vagrant/.vim/pack/myHoge/start/hogePlugin`以下に設置した場合、最初から適用。

## 参考

[【詳解】モテたいVimmer必見　快適にコーディングするためのvimrc解説][*1]

[*1]:http://qiita.com/ahiruman5/items/4f3c845500c172a02935
[*2]:https://github.com/vim/vim/blob/master/runtime/doc/repeat.txt#L459