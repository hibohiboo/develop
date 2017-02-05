# tslintの導入

## 必要なnpmパッケージのインストール

```
npm install -g --save-dev gulp typescript
npm install --save-dev tslint gulp gulp-tslint
```

## tslint設定ファイルの用意

```
project
 - .vscode
   - tasks.json # vscodeからgulpを実行する設定
 - tslint.json  # チェックする項目のルール
 - gulpfile.js  # tslintを実行するタスク
 - package.json
 + node_modules
```

tasks.json

```json
{
	"version": "0.1.0",
	"command": "gulp",
	"isShellCommand": true,
	"args": [
		"--no-color"
	],
	"tasks": [
		{
			"taskName": "tslint",
			"args": [],
			"problemMatcher": {
				"owner": "tslint",
				"fileLocation": [
					"relative",
					"${workspaceRoot}"
				],
				"severity": "warning",
				"pattern": {
					"regexp": "^(\\S.*)\\[(\\d+), (\\d+)\\]:\\s+(.*)$",
					"file": 1,
					"line": 2,
					"column": 3,
					"message": 4
				}
			}
		}
	]
}
```

gulpfile.js

```js
'use strict';

const gulp = require('gulp');
const gulp_tslint = require('gulp-tslint');

gulp.task('default', ['tslint']);

gulp.task('tslint', () => {
    return gulp.src(['**/*.ts', '!**/*.d.ts', '!node_modules/**'])
      .pipe(gulp_tslint())
      .pipe(gulp_tslint.report());
});
```

tslint.json

``` json
{
	"rules": {
		"no-unused-expression": true,
		"no-duplicate-variable": true,
		"no-duplicate-key": true,
		"no-unused-variable": true,
		"curly": true,
		"class-name": true,
		"semicolon": ["always"],
		"triple-equals": true
	}
}
```

## 実行

[ctrl] + [shift] + [p] でコマンドパレットを開く。

run taskと入力して[enter] → tslintを選択して[enter]

## 参考

[tslint][*1]  
[vscode-tslint][*2]  
[Visual Studio Codeの使い勝手をよくするツール (1/5)][*3]  
[qiita vscode moca][*4]  
[Visual Studio Code を使う上で良くわかっていなかった(基本的な)用語とか][*5]
[tslint-json][*7]
[tslint-cli][*8]

[*1]:https://marketplace.visualstudio.com/items?itemName=eg2.tslint
[*2]:https://github.com/Microsoft/vscode-tslint
[*3]:http://www.atmarkit.co.jp/ait/articles/1509/08/news019.html
[*4]:http://qiita.com/xingyanhuan/items/46ab06dc6ad9ffaec4f2
[*5]:http://qiita.com/satokaz/items/dd2f16fc953e7bdb6d2f
[*6]:https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules
[*7]:https://palantir.github.io/tslint/usage/tslint-json/
[*8]:https://palantir.github.io/tslint/usage/cli/
