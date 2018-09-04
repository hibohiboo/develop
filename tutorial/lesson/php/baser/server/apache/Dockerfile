FROM php:7.1-apache

# Apacheモジュールインストール
RUN a2enmod rewrite

# PHPモジュールインストール
RUN docker-php-ext-install mbstring


# Install xdebug for php debugging
RUN apt-get update 
RUN pecl install xdebug

RUN echo "zend_extension=$(find /usr/local/lib/php/extensions/ -name xdebug.so)" > /usr/local/etc/php/conf.d/xdebug_settings.ini \
    && echo "debug.default_enable = 1" >> /usr/local/etc/php/conf.d/xdebug_settings.ini \
    && echo "xdebug.remote_enable=on" >> /usr/local/etc/php/conf.d/xdebug_settings.ini \
    && echo "xdebug.remote_autostart=on" >> /usr/local/etc/php/conf.d/xdebug_settings.ini \
    && echo "xdebug.remote_connect_back = on" >> /usr/local/etc/php/conf.d/xdebug_settings.ini


# PHPのログを出力
# error_log = /dev/stderr\n\
RUN echo '\
log_errors = On\n\
error_log =/dev/stderr\n\
error_reporting = E_ALL\n\
display_errors = On\n\
' >> /usr/local/etc/php/conf.d/docker.ini

# php設定
RUN echo '\
date.timezone = "Asia/Tokyo"\n\
memory_limit = -1\n\
' >> /usr/local/etc/php/php.ini

# apacheのログを出力
RUN echo '\
CustomLog /var/log/apache2/access.log combined \n\
ErrorLog /var/log/apache2/error.log\n\
LogLevel warn\n\
' >> /etc/apache2/conf-enabled/log.conf

