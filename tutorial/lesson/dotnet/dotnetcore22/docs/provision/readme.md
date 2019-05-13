## vault.ymlの作成時の文言

ansible-vault create vault.ymlで作成するときに開かれるviには以下を入力

```
---
# The password for the sa user. Only used if mssql-server needs to be installed.
sa_password: '!sa_password001'
test_user_name: 'test_db_user'
test_user_pass: '!test_password001'
```

vault.ymlを作成するときに使ったパスワードは任意のファイル.passwdに保存してgit管理から外す

### .passwd

```
password
```

## sql server バージョン確認

```bash
sqlcmd -S localhost -U test_db_user -P '!test_password001' -Q ' select @@version, @@language'
```



## エラー発生

pythonインストール時

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

パーミション設定をディレクトリに行わずにansible vaultを使ったとき

```
    default:  [WARNING]: Error in vault password file loading (default): Problem running
    default: vault password script /vagrant/provision/playbooks/.passwd ([Errno 8] Exec
    default: format error: '/vagrant/provision/playbooks/.passwd'). If this is not a script,
    default: remove the executable bit from the file.
    default: ERROR! Problem running vault password script /vagrant/provision/playbooks/.passwd ([Errno 8] Exec format error: '/vagrant/provision/playbooks/.passwd'). If this is
not a script, remove the executable bit from the file.
The SSH command responded with a non-zero exit status. Vagrant
assumes that this means the command failed. The output for this command
should be in the log above. Please read the output to determine what
went wrong.
```

vaultのパスワードを間違えた時

```
    default: ERROR! Decryption failed (no vault secrets were found that could decrypt) on /provision/playbooks/vault.yml
```

ansibleのtasks/main.ymlにタブ文字を入れてしまったとき

```
    default: ERROR! Syntax Error while loading YAML.
    default:   found character '\t' that cannot start any token
```

## コミット


[SqlServer使用可能時点](https://github.com/hibohiboo/develop/tree/9d899071d448fcf3af7baf07aed88ebca9f271c7/tutorial/lesson/dotnet/dotnetcore22) 
[docker + ansible に諦めた時点](https://github.com/hibohiboo/develop/tree/f1998f1f161c5a2984e48be66347e266849dcc62/tutorial/lesson/dotnet/dotnetcore22)

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
[python.py](https://qiita.com/hirohiro77/items/377dfc0a264acb3db222)
[ansible python3.7](https://dev.classmethod.jp/server-side/python/ansible-python3/)
[microsoft/sql-server-samples](https://github.com/microsoft/sql-server-samples/tree/master/samples/features/high%20availability/Linux/Ansible%20Playbook)
[ansible vault](http://jimaoka.hatenablog.jp/entry/ansible-vault)
[ansible vault windows](https://mseeeen.msen.jp/vagrant-ansible-local-provisioner-with-vault-password/)
[sqlserver サーバレベルのロール](https://docs.microsoft.com/ja-jp/sql/relational-databases/security/authentication-access/server-level-roles?view=sql-server-2017)
[sqlserver データベースレベルのロール](https://docs.microsoft.com/ja-jp/sql/relational-databases/security/authentication-access/database-level-roles?view=sql-server-2017)
[sql server tool](https://docs.microsoft.com/ja-jp/sql/linux/quickstart-install-connect-red-hat?view=sql-server-2017)
[sqlcmd](https://docs.microsoft.com/ja-jp/sql/tools/sqlcmd-utility?view=sql-server-2017)
[sqlcmd](https://qiita.com/zaburo/items/6edf7c05c5d4f5e039eb)
[DB初期化](https://sakapon.wordpress.com/2010/07/13/sqlserverscript/)
[照合順序](https://www.ksakae1216.com/entry/2017/05/18/063000)
[SqlServer文字化け](https://kitigai.hatenablog.com/entry/2018/05/27/010440)
[ないときは作る](http://fla-moo.blogspot.com/2013/05/sqlserversqlite.html)

[vagrant上のcentosにansibleでdocker-ceをインストールする](https://qiita.com/va034600/items/3a49d02315e5999833e5)
[ansible で docker](https://blue1st-tech.hateblo.jp/entry/2016/06/20/085321)
[AnsibleでDockerとかしたいのにdocker-pyに苦しめられた話](http://kazzna.hatenablog.com/entry/2016/02/24/200808)
[Rails+SQL Server環境をDocker Composeで構築する](https://qiita.com/suzuki_sh/items/af2ba90ffa8200b996d7)
[test](https://docs.microsoft.com/ja-jp/dotnet/standard/microservices-architecture/multi-container-microservice-net-applications/database-server-container)
[sqlserver docker 実行と接続](https://docs.microsoft.com/ja-jp/sql/linux/quickstart-install-connect-docker?view=sql-server-2017&pivots=cs1-bash)
[dockerコマンドをcronで実行させたら「TTYが無いよ」と怒られた件](https://hodalog.com/how-to-resolve-the-error-that-the-input-device-is-not-a-tty/)
[Excec](https://docs.docker.com/compose/reference/exec/)
[【解決】SQLEXPRESSインストールエラー　e:\sql11_main_t.obj.x86release？](http://40mvvm.blogspot.com/2014/)
[vagrant provision ](https://qiita.com/koara-local/items/28f108fb475b364def13)
