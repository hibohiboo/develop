## 手順

### 仮想環境の立ち上げ
まずはそれぞれの仮想環境を立ち上げておく

```
cd controll && vagrant up
cd targets && vagrant up
```

### 鍵の登録

コントロールサーバで作成した公開鍵をターゲットサーバに登録する

```
./controll/bin/run.sh add-publickey.sh
```



## 参考

[ansible expect][*1]
[公開鍵を使う][*2]

[*1]:https://qiita.com/nyk0401/items/f0fdbdbadf61e1217dec
[*2]:https://qiita.com/t_732_twit/items/2303a0c3f27c288382c5

