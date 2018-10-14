FROM mysql:5.7

# https://qiita.com/koyo-miyamura/items/4d1430b9086c5d4a58a5
# permission 777 のファイルを読み込まないので、conf.dをvolumeマウントしても読み込まれない。
ADD ./conf.d/config-file.cnf /etc/mysql/conf.d/config-file.cnf

RUN chmod 644 /etc/mysql/conf.d/config-file.cnf