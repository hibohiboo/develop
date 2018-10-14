FROM php:7.2.6-apache

# Apacheモジュールインストール
RUN a2enmod rewrite

RUN apt-get update 
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN pecl install xdebug

RUN echo "zend_extension=$(find /usr/local/lib/php/extensions/ -name xdebug.so)" > /usr/local/etc/php/conf.d/xdebug_settings.ini 



# PHPのログを出力

RUN echo '\
log_errors = On\n\
error_log =/dev/stderr\n\
error_reporting = E_ALL\n\
display_errors = On\n\
' >> /usr/local/etc/php/conf.d/docker.ini


# apacheのログを出力
RUN echo '\
CustomLog /var/log/apache2/access.log combined \n\
ErrorLog /var/log/apache2/error.log\n\
LogLevel warn\n\
' >> /etc/apache2/conf-enabled/log.conf

