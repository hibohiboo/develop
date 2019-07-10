## xserverを使った接続確認

### windows側

#### ssh

windows側でssh接続

```
$ ssh docker@192.168.50.10 -p 10022
```

#### xserver

##### インストール

```
cinst -y vcxsrv
```

インストール後、［スタート］メニューの［VcXsrv］－［XLaunch］で起動。
デフォルト設定のまま起動。バーにxserverが追加されたことを確認。
![](img/xserver.png)

#### ip確認

コマンドプロンプトを立ち上げて、 `ipconfig`コマンドを確認。

```
イーサネット アダプター イーサネット 3:

   接続固有の DNS サフィックス . . . . .:
   IPv4 アドレス . . . . . . . . . . . .: 192.168.33.1
   サブネット マスク . . . . . . . . . .: 255.255.255.0
   デフォルト ゲートウェイ . . . . . . .:
```


### vagrant上のubuntuからwindowsのxserverの起動確認

上記で確認したIPを入力して動作を確認。

```
sudo apt install x11-apps
DISPLAY=192.168.33.1:0.0 xeyes
```

### vagrant上のubuntuからwindowsのxserverの起動確認

上記で確認したIPを入力して動作を確認。

```
sudo apt install x11-apps
DISPLAY=192.168.33.1:0.0 xeyes
```

### docker上からのwindowsのxserverの起動確認


## 参考

[Electronの開発環境をDocker上に作ってエラーに対処する](https://blog.hiroaki.home.group.jp/2016/11/electrondocker.html)
[UbuntuにVSCodeをインストールする3つの方法](https://qiita.com/yoshiyasu1111/items/e21a77ed68b52cb5f7c8)
[WSL上にXサーバをインストールしてGUIを実現する（VcXsrv編）](https://www.atmarkit.co.jp/ait/articles/1812/06/news040.html)
[chocolatey](https://chocolatey.org/packages/vcxsrv)
[DockerでXサーバを動かしてGUIを直接表示する](https://kunst1080.hatenablog.com/entry/2018/03/18/225102)
[WSLでvue-cli3 + electron](https://qiita.com/MssKnd/items/062b417daa57868db4d2)
[GUI application を docker で起動する](https://attonblog.blogspot.com/2018/04/docker-with-x11.html)
