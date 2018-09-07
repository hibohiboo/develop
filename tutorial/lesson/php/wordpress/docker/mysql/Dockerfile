FROM mariadb:10.3

RUN sed -i -e "s/\(\[mysqld\]\)/\1\ncharacter-set-server = utf8mb4/g" /etc/mysql/my.cnf
RUN sed -i -e "s/\(\[mysqld\]\)/\1\ncollation-server = utf8mb4_unicode_ci/g" /etc/mysql/my.cnf
RUN sed -i -e "s/\(\[client\]\)/\1\ndefault-character-set = utf8mb4/g" /etc/mysql/my.cnf
RUN sed -i -e "s/\(\[mysqldump\]\)/\1\ndefault-character-set = utf8mb4/g" /etc/mysql/my.cnf
RUN sed -i -e "s/\(\[mysql\]\)/\1\ndefault-character-set = utf8mb4/g" /etc/mysql/my.cnf

RUN sed -i -e "s/^#bind-addresss*=s*0.0.0.0/bind-address=0.0.0.0/" /etc/mysql/my.cnf
RUN sed -i -e "s/\(\[mysqld\]\)/\1\nbind-address=127.0.0.1/g" /etc/mysql/my.cnf
