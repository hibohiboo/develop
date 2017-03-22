# ドキュメント作成ツール

## sphinx

python用のドキュメント作成だが、拡張が豊富。
日本語のドキュメントもそこそこ最近まで更新されている。

```bash
sudo pip install git+https://github.com/sphinx-doc/sphinx@stable
```

## sphinx-jsの導入

jsdocが必要。node.jsのない場合は先にインストール

```
sudo apt-get install -y curl
sudo curl -sL https://deb.nodesource.com/setup_6.x | bash -
sudo apt-get install -y nodejs
npm i -g jsdoc 
```

sphinx-js本体のインストール

```bash
pip install 'sphinx-js>=1.5,<2.0'
```

conf.pyの編集

```py
extensions = [
    'sphinx.ext.autodoc',
    'sphinx_js'
]
```

この状態で、`make html`をすると、jsのソースファイルの場所が見つからない場合に以下のエラーがでる。
`jsdoc source_path -X`で取得したjson文字列がpythonに渡されるため、
これが空の場合、nullとなって`Expecting value`が発生する。

```
sphinx-build -b html -d build/doctrees   source build/html
Running Sphinx v1.5.4+
loading translations [ja]... done
loading pickled environment... done
Exception occurred:
  File "/usr/local/lib/python3.6/json/decoder.py", line 357, in raw_decode
    raise JSONDecodeError("Expecting value", s, err.value) from None
json.decoder.JSONDecodeError: Expecting value: line 1 column 1 (char 0)
The full traceback has been saved in /tmp/sphinx-err-6x85g_us.log, if you want to report the issue to the developers.
Please also report this if it was a user error, so that a better error message can be provided next time.
A bug report can be filed in the tracker at <https://github.com/sphinx-doc/sphinx/issues>. Thanks!
Makefile:56: recipe for target 'html' failed
make: *** [html] Error 1
```

ソースのある位置をconf.pyに追記。

```py
js_source_path = '/root/src/wmfwapp'
```



## 参考

[SphinxドキュメントをDockerでビルドする][*1]
[業務での利用事例Add Star][*2]
[PythonプロジェクトのドキュメントをSphinxで作成する][*3]
[プロジェクトを作る][*4]
[逆引き辞典][*5]
[ドメイン][*6]
[sphinx-js][*7]
[conf.py][*8]
[extension][*9]
[okikata][*10]
[拡張][*11]

[*1]:http://www.rhoboro.com/2016/09/04/docker-build-sphinx.html
[*2]:http://sphinx-users.jp/event/20101203_jus_benkyoukai/practical_sample/index.html
[*3]:http://qiita.com/icoxfog417/items/9e2eb932b61aa9b9e427
[*4]:http://sphinx-users.jp/gettingstarted/make_project.html#id2
[*5]:http://sphinx-users.jp/reverse-dict/index.html
[*6]:http://www.sphinx-doc.org/ja/stable/domains.html
[*7]:https://github.com/erikrose/sphinx-js
[*8]:http://www.sphinx-doc.org/ja/stable/config.html
[*9]:http://tk0miya.hatenablog.com/entry/20111206/p1
[*10]:http://oktavia.info/ja/pages/what/what.html
[*11]:http://sphinx.shibu.jp/extensions.html
