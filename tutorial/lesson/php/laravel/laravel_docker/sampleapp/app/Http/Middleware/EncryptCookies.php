<?php

namespace App\Http\Middleware;

use Illuminate\Cookie\Middleware\EncryptCookies as Middleware;

class EncryptCookies extends Middleware
{
    /**
     * The names of the cookies that should not be encrypted.
     *
     * @var array
     */
    protected $except = [
        // 開発環境での例外
        'XDEBUG_SESSION', 'adminer_version', 'adminer_sid', 'adminer_key', 'adminer_permanent', '_ga'
    ];
}
