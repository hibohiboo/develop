FROM php:7-fpm
RUN apt-get update 
RUN docker-php-ext-install pdo_mysql
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

WORKDIR /var/www/html
