## エラー発生

```
    default: Traceback (most recent call last):
    default:   File "/usr/local/src/Python-3.7.3/Lib/runpy.py", line 193, in _run_module_as_main
    default:     "__main__", mod_spec)
    default:   File "/usr/local/src/Python-3.7.3/Lib/runpy.py", line 85, in _run_code
    default:     exec(code, run_globals)
    default:   File "/usr/local/src/Python-3.7.3/Lib/ensurepip/__main__.py", line 5, in <module>
    default:     sys.exit(ensurepip._main())
    default:   File "/usr/local/src/Python-3.7.3/Lib/ensurepip/__init__.py", line 204, in _main
    default:     default_pip=args.default_pip,
    default:   File "/usr/local/src/Python-3.7.3/Lib/ensurepip/__init__.py", line 117, in _bootstrap
    default:     return _run_pip(args + [p[0] for p in _PROJECTS], additional_paths)
    default:   File "/usr/local/src/Python-3.7.3/Lib/ensurepip/__init__.py", line 27, in _run_pip
    default:     import pip._internal
    default: zipimport.ZipImportError: can't decompress data; zlib not available
    default: make: *** [altinstall] Error 1
```

## 参考

[Centos7.6](https://www.rem-system.com/centos76-install/)
[virtualenv](https://docs.python.org/ja/3/library/venv.html)
[virtualenv](https://mycodingjp.blogspot.com/2018/12/python-venv-virtualenv.html)
[memo docker](https://qiita.com/hibohiboo/items/00f8c5e172d00c15a269)
[memo centos](https://qiita.com/hibohiboo/items/0768b594cb55346faccf)
[memo ansible](https://qiita.com/hibohiboo/items/04edd4748db266f717b2)
[ansible centos](https://ytooyama.hatenadiary.jp/entry/2017/04/19/223514)
[python3](https://weblabo.oscasierra.net/python3-centos7-yum-install/)
[python3.7](https://narito.ninja/blog/detail/20/)
[how to install python3.7](https://tecadmin.net/install-python-3-7-on-centos/) ... インストールの参考
[python3.8](https://qiita.com/ksato9700/items/3846e8db573a07c71c33) ... 3.8は20191020がリリースらしい
[python -v](https://ja.stackoverflow.com/questions/41096/python-v%E3%82%92%E5%AE%9F%E8%A1%8C%E3%81%97%E3%81%9F%E6%99%82%E3%81%AE%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%A3%E3%81%BD%E3%81%84%E6%A8%99%E6%BA%96%E5%87%BA%E5%8A%9B%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)
