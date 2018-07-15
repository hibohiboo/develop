# スプリング環境テスト

## ディレクトリ構造

```yaml
project
  + bin   # コマンド覚書用のシェルスクリプト
  + data  # dockerの永続化用ディレクトリ
  - docker
    - gradle
      - Dockerfile
    - oracle
      - 11.2.0.2
        - Checksum.xe
        - Dockerfile.xe
        - checkDBStatus.sh
        - rnOracle.sh
        - setPasword.sh
        - xe.rsp
        - oracle-xe-11.2.0-1.0.x86_64.rpm.zip # Oracleからダウンロードしたもの。.gitignoreで無視
      - buildDockerImage.sh
      + oracle-docker-images  # githubからcloneしたもの。.gitignoreで無視。11.2.0.2のディレクトリをコピーしただけなので実質不要
    - spring
      - Dockerfile
    - .env # docker-composer.yml で使用する環境変数設定
    - docker-compose.yml
  - src
    - hello
      - build.gradle
      - settings.gradle
      - lib
        - ojdbc7.jar # Oracleからダウンロードしたもの。.gitignoreで無視
      - src
        - main
          - java
            - hello
              - hello
                - model
                  - Staff.java
                - repository
                  - StaffRepository.java
                - HelloApplication.java
          - resouces
            - application.yml
        + test
```

## sqlplus.shについて

まずは、` docker-compose up -d dbserver ` を行い、dbserverをバックグラウンドで起動しておく。

次に、sqlplusでの接続を試みるが、一度で接続できないことが多い。

```
vagrant@vagrant[master]:/vagrant/tutorial/lesson/spring$ ./bin/sqlplus.sh
```

以下のエラーが出る。

```
7df144c6f135        docker_dbserver              "/bin/sh -c 'exec $O…"   19 seconds ago      Up 18 seconds (health: start
ing)   0.0.0.0:1521->1521/tcp, 0.0.0.0:8085->8080/tcp   docker_dbserver_1
WARNING: The JAVA_OPTS variable is not set. Defaulting to a blank string.

SQL*Plus: Release 11.2.0.2.0 Production on Sun Jul 15 15:08:51 2018

Copyright (c) 1982, 2011, Oracle.  All rights reserved.

ERROR:
ORA-12528: TNS:listener: all appropriate instances are blocking new connections
```

 Enterを2回押して一旦終了させる。

```
Enter user-name:
ERROR:
ORA-12547: TNS:lost contact


Enter user-name:
ERROR:
ORA-12547: TNS:lost contact


SP2-0157: unable to CONNECT to ORACLE after 3 attempts, exiting SQL*Plus
```

もう一度sqlplusでの接続を試みる。

```
vagrant@vagrant[master]:/vagrant/tutorial/lesson/spring$ ./bin/sqlplus.sh
```

```
7df144c6f135        docker_dbserver              "/bin/sh -c 'exec $O…"   25 seconds ago      Up 23 seconds (health: start
ing)   0.0.0.0:1521->1521/tcp, 0.0.0.0:8085->8080/tcp   docker_dbserver_1
WARNING: The JAVA_OPTS variable is not set. Defaulting to a blank string.

SQL*Plus: Release 11.2.0.2.0 Production on Sun Jul 15 15:08:55 2018

Copyright (c) 1982, 2011, Oracle.  All rights reserved.


Connected to:
Oracle Database 11g Express Edition Release 11.2.0.2.0 - 64bit Production

SQL> 
```


## データベース

oracle 11 を使用。
[DockerでOracleデータベース11g XEを構築][*1]を参考にした。
oracle/docker-images の [11.0.2.2](https://github.com/oracle/docker-images/tree/master/OracleDatabase/SingleInstance/dockerfiles/11.2.0.2)ディレクトリをコピー。
同じディレクトリにoracle-xe-11.2.0-1.0.x86_64.rpm.zipを配置。


## .envファイル

データベース用に環境変数の設定

```env
ORACLE_PWD=MyOraclePassword
```

## ソースメモ

[oracle11g稼働時点](https://github.com/hibohiboo/develop/blob/d06194abd971670e3f06040d61199d6d66fbee8e/tutorial/lesson/spring/)

 ## 参考

[DockerでOracleデータベース11g XEを構築][*1]
[dockerでOracle DB 11gを動かす][*2]
[Dockerで始めるSpring Boot][*3]
[表領域][*4]
[oracle spring sample][*5]
[auto increment][*6.1]
[SpringBootの開発環境をdockerでつくる][*7]
[sample][*8]
[Spring Data JPA でのクエリー実装方法まとめ][*10]
[【JavaEE】今からでも間にあうJPA入門][*11]
[初めてのJPA--シンプルで使いやすい、Java EEのデータ永続化機能の基本を学ぶ][*12]
[ Invalid number format for port number][*13]
[Gradle使い方メモ][*14]
[Dockerで- /etc/localtime:/etc/localtime:ro がMount Deniedを出すやつ][*15]
[docker-compose][*16]
[oracleでautoincrement][*17]


[*1]:http://ryoichi0102.hatenablog.com/entry/2017/12/14/183046
[*2]:http://tmegos.hatenablog.jp/entry/docker-oracle-11g
[*3]:https://qiita.com/ken0909/items/a3f8594ce677bbc7c4c2
[*4]:https://www.projectgroup.info/tips/Oracle/SQL/SQL000007.html
[*5]:https://github.com/shawn-mcginty/spring-boot-oracle-example
[*6.1]:https://stackoverflow.com/questions/11296361/how-to-create-id-with-auto-increment-on-oracle
[*6]:https://stackoverflow.com/questions/10461861/use-database-command-on-sql-plus-oracle-11gr1
[*7]:https://qiita.com/wataling/items/fa8b74fa50d80b88aea3
[*8]:https://github.com/springframeworkguru/spring-boot-oracle-example
[*9]:https://web-dev.hatenablog.com/entry/spring-boot/intro/jpa
[*10]:https://qiita.com/tag1216/items/55742fdb442e5617f727
[*11]:http://www.dcom-web.co.jp/technology/jpa1/
[*12]:https://builder.japan.zdnet.com/sp_oracle/35067018/
[*13]:https://confluence.atlassian.com/bitbucketserverkb/io-error-invalid-number-format-for-port-number-when-connecting-to-oracle-database-939939845.html
[*14]:https://qiita.com/opengl-8080/items/4c1aa85b4737bd362d9e
[*15]:https://remicck.hatenablog.com/entry/2018/02/23/165032
[*16]:https://docs.docker.com/compose/reference/up/
[*17]:https://stackoverflow.com/questions/9733085/auto-increment-for-oracle
