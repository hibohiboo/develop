# express lesson

[expressチュートリアル][*1]  を試す。

## フォルダ構成

```yml
- express # プロジェクトフォルダ
  - bin   # docker起動用シェルファイル
	  - container_build.sh # docker-compose build
	  - bash.sh            # docker-compose run express /bin/bash
		- start.sh           # docker-compose up
	  - www.sh             # docker-compose run express node bin/www
	- myapp # expressプロジェクトフォルダ
		- public # 静的ファイル
			+ images
			+ javascripts
			+ stylesheets
		- routes # ルーティング
			- index.js
			- users.js
		- views # viewファイル
			- error.pug
			- index.pug
			- layout.pug
		- .gitignore   # git用設定ファイル
		- app.js       # expressサーバの設定
		- package.json # packageファイル

```

## インストール

テンプレートエンジンのjadeがライセンスの関係で[pug][*3]に変わるようなので、
そちらに対応。

## Serving static files in Expressa

## 参考

[expressチュートリアル日本語][*1]  
[expressチュートリアル英語][*2]  
[pug][*3]  


[*1]:http://expressjs.com/ja/starter/installing.html
[*2]:http://expressjs.com/en/starter/installing.html
[*3]:https://expressjs.com/en/guide/using-template-engines.html