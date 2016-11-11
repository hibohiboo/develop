# vimrc

## .vimrc

ユーザーのホームディレクトリ以下に.vimrcファイルを置く。
そうすることで、Vimを起動した時に自動的に.vimrcファイルを読み込む。  
設定の意味は.vimrcのコメントに記述

## プラグイン

`/home/vagrant/.vim/pack/myHoge/opt/hogePlugin`以下にプラグインをダウンロード。

.vimrcに以下を記述
```
:packadd hogePlugin
```

`/home/vagrant/.vim/pack/myHoge/start/hogePlugin`以下に設置した場合、最初から適用。

## 参考

[【詳解】モテたいVimmer必見　快適にコーディングするためのvimrc解説][*1]
[lua ライブラリ参考（失敗）][*3] [*4][*4] [*5][*5] [*6][*6]
[lua ライブラリ参考(成功)][*7]
[vimrcサンプル][*8]
[vim typescript][*9]

[*1]:http://qiita.com/ahiruman5/items/4f3c845500c172a02935
[*2]:https://github.com/vim/vim/blob/master/runtime/doc/repeat.txt#L459
[*3]:http://milkpot.sakura.ne.jp/lua/lua53_manual_ja.html
[*4]:http://toua20001.hatenablog.com/entry/2016/06/10/001153
[*5]:http://lsifrontend.hatenablog.com/entry/2013/06/03/225441
[*6]:http://www.lua.org/manual/5.3/readme.html
[*7]:http://vim-jp.org/docs/build_linux.html
[*8]:http://tydk27.hatenadiary.com/entry/20160121/1453380852
[*9]:http://qiita.com/maxmellon/items/0e6173cdd51843053839
