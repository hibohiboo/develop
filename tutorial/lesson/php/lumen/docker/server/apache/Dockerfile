FROM php:7.2-apache

# Apacheモジュールインストール
RUN a2enmod rewrite

# PHPモジュールインストール
RUN docker-php-ext-install mbstring
RUN docker-php-ext-install pdo_mysql
RUN pecl install xdebug

RUN echo "zend_extension=$(find /usr/local/lib/php/extensions/ -name xdebug.so)" > /usr/local/etc/php/conf.d/xdebug_settings.ini \
    && echo "debug.default_enable = 1" >> /usr/local/etc/php/conf.d/xdebug_settings.ini \
    && echo "xdebug.remote_enable=on" >> /usr/local/etc/php/conf.d/xdebug_settings.ini \
    && echo "xdebug.remote_autostart=on" >> /usr/local/etc/php/conf.d/xdebug_settings.ini \
    && echo "xdebug.remote_connect_back = on" >> /usr/local/etc/php/conf.d/xdebug_settings.ini \
    && echo "xdebug.remote_log = /var/log/apache2/xdebug.log" >> /usr/local/etc/php/conf.d/xdebug_settings.ini

# php設定
RUN echo '\
date.timezone = "Asia/Tokyo"\n\
memory_limit = -1\n\
' >> /usr/local/etc/php/php.ini

# PHPのログを出力
# error_log = /dev/stderr\n\
RUN echo '\
log_errors = On\n\
error_log = /var/log/apache2/php.log\n\
error_reporting = E_ALL\n\
display_errors = On\n\
' >> /usr/local/etc/php/conf.d/docker.ini

# apacheのログを出力
RUN echo '\
CustomLog /var/log/apache2/access.log combined \n\
ErrorLog /var/log/apache2/error.log\n\
LogLevel warn\n\
' >> /etc/apache2/conf-enabled/log.conf