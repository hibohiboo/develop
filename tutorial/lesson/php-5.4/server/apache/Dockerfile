FROM php:5.4-apache

# Apacheモジュールインストール
RUN a2enmod rewrite

# PHPモジュールインストール
RUN docker-php-ext-install mbstring
RUN docker-php-ext-install mysql

# PHPのログを出力
RUN echo '\
log_errors = On\n\
error_log = /dev/stderr\n\
error_reporting = E_ALL\n\
display_errors = Off\n\
' >> /usr/local/etc/php/conf.d/docker.ini

# Install xdebug for php debugging
RUN apt-get update
RUN apt-get install -y php-pear
RUN pecl install xdebug-2.4.1

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