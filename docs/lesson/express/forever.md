# Forever

turorial/node.js/forever参照

## フォルダ構成

```yml
- express # プロジェクトフォルダ
  - bin   # docker起動用シェルファイル
	  - container_build.sh # docker-compose build
	  - bash.sh            # docker-compose run express /bin/bash
		- start.sh           # docker-compose up
		- debug.sh           # docker-compose run express npm run debug
	- express # dockerfile用フォルダ
	  - Dockerfile
	- docker-compose.yml # docker-compose 設定ファイル
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


docker-compose.yml
```yml
express:
  build: ./express
  volumes:
   - ./myapp/package.json:/my_express/myapp/package.json
   - ./myapp/app.js:/my_express/myapp/app.js
   - ./myapp/public:/my_express/myapp/public
   - ./myapp/views:/my_express/myapp/views
   - ./myapp/routes:/my_express/myapp/routes
  ports:
    - "80:3000"
  command: [node, bin/www]
```

Dockerfile
```bash
FROM node:7.7.1
WORKDIR /my_express
RUN npm init -y
RUN npm install express-generator -g
# .gitignoreの追加
# viewエンジンにpugを使用
RUN express myapp --git --pug --view pug 
WORKDIR /my_express/myapp
RUN npm install body-parser --save
RUN npm install cookie-parser --save
RUN npm install debug --save
RUN npm install morgan --save
RUN npm install serve-favicon --save
RUN npm install pug --save
RUN npm install express@5.0.0-alpha.5 --save
```

## 参考

[expressチュートリアル forever日本語][*1]  


[*1]:http://expressjs.com/ja/advanced/pm.html#forever
