# 

## リモートレジストリへの保存

### docker hub にログイン

```
docker login
```

### タグをつける

```
docker tag kuard-amd64:1 hibohiboo66/kuard-amd64:1
```

### kuardイメージをdocker hub にプッシュ

```
docker push hibohiboo66/kuard-amd64:1
```

## 参考
[Docker Hubの使い方とGitHubからのDockerイメージ自動ビルド (1/2)][*1]
[イメージのタグ付け、送信、取得][*2]

[*1]:http://www.atmarkit.co.jp/ait/articles/1408/26/news038.html
[*2]:http://docs.docker.jp/linux/step_six.html
