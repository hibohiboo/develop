<?php
Configure::write('Security.salt', 'a2AlmOEEDl8D5FlMl192MFb03AURLQ6KAcRjF5NW');
Configure::write('Security.cipherSeed', '48211488681076870011424794144');
Configure::write('Cache.disable', false);
Configure::write('Cache.check', true);
Configure::write('Session.save', 'session');
Configure::write('BcEnv.siteUrl', 'http://192.168.50.10/');
Configure::write('BcEnv.sslUrl', '');
Configure::write('BcEnv.mainDomain', '');
Configure::write('BcApp.adminSsl', false);
Configure::write('BcApp.allowedPhpOtherThanAdmins', false);
Cache::config('default', array('engine' => 'File'));
Configure::write('debug', 0);