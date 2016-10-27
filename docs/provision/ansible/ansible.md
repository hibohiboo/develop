# ansible

プロビジョニングツール

## ディレクトリ構造

```
provision
  L site.yml      … 最初に読み込むファイル
  L playbooks
    L inventory 
      L hosts     … プロビジョニング対象のipが書かれたファイル
    L roles       … プロビジョニング対象を入れるフォルダ
      L common
        L docker
          L tasks … dockerのインストール

```

## 基本ルール

べき等性を保つこと。（何度実行しても結果は同じ）

### タスクの一覧表示

プレイブックの途中のタスクから実行したい場合は、`ansible-playbook`コマンドの`--list-tasks`オプションで一覧を確認。

基本的にタスク名は`role名 : taskのname属性`。コロンの両サイドには半角スペースを空ける。

タスク名確認サンプル：

```shell
$ cd src/
$ ansible-playbook --list-tasks site.yml
```

### デバッグの実行

`--start-at-task`オプションと`--step`オプションをつけて`ansible-playbook`を実行。
その際は必ず`-l`オプションにより実行対象hostを指定。

途中でタスクを終了したい場合は、タスクの確認中に「Ctrl+C」を押すと強制終了。

|オプション名   |概要                                                  |
|:--------------|:-----------------------------------------------------|
|--step         |playbookのタスク毎に実行するか確認するようになる。    |
|--start-at-task|playbookを特定のタスクから実行。                      |
|-l             |実行対象のhostsを指定。                               |
|--tags=foo,bar |指定したタグのplayやtaskのみを実行。                  |

タスク確認の例：

```shell
$ cd src/
$ ansible-playbook site.yml --step -l hml_web --start-at-task="php_remi : uninstall php"
```

### Playbookのチェック

構文チェック：

```shell
$ ansible-playbook --syntax-check site.yml
```

ホストのリスト：

```shell
$ ansible-playbook --list-hosts site.yml
```

チェックモード（dryrun）：

```shell
$ ansible-playbook --check site.yml
```

差分の表示：

```shell
$ ansible-playbook --diff --check site.yml
```

## Ansibleの変数の優先順位

下が優先。

```
role defaults [1]
inventory vars [2]
inventory group_vars
inventory host_vars
playbook group_vars
playbook host_vars
host facts
play vars
play vars_prompt
play vars_files
registered vars
set_facts
role and include vars
block vars (only for tasks in block)
task vars (only for the task)
extra vars (always win precedence)（例：`--extra-vars "version=1.23.45 other_variable=foo"`）
```

<http://docs.ansible.com/ansible/playbooks_variables.html#variable-precedence-where-should-i-put-a-variable> より。

## YAMLで引用符が必要な場合

『初めてのAnsible』P.42より。

### モジュールの指定の直後に変数を参照

```yaml
- name: perform some task
  command: "{{ myapp }} -a foo"
```

### コロンを含む変数

```yaml
- name: show a debug message
  debug: "msg='The debug module will print a message: neat, eh?'"
```

## Document

* [Ansible Document](http://docs.ansible.com/ansible/index.html)

10月18日 10:10

skip sample
http://okisanjp.hatenablog.jp/entry/2016/05/09/111502

10:13

npm bin について
http://qiita.com/Jxck_/items/efaff21b977ddc782971

### 参考サイト

[チュートリアル][*1]  
[ベストプラクティス][*2]  
[チートシート][*3]  
[入門][*6]  
[jinja2 公式][*8]  
[best practice][*7]  
[inventory][*4]
[state][*5]

[*1]:http://yteraoka.github.io/ansible-tutorial/
[*2]:http://knowledge.sakura.ad.jp/tech/3084/
[*3]:http://qiita.com/unarist/items/39f5510f95c752c10df1
[*4]:http://docs.ansible.com/ansible/intro_inventory.html
[*5]:https://www.infiniteloop.co.jp/blog/2013/08/ansible/
[*6]:http://dev.classmethod.jp/server-side/ansible/introduction_about_role/
[*7]:http://docs.ansible.com/ansible/playbooks_best_practices.html
[*8]:http://docs.ansible.com/ansible/playbooks_tests.html