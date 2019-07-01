"use strict";

const JsonConfig = require('./jsonConfig');

const jsonConfig = new JsonConfig();
jsonConfig.read('app/samples/conf.json');
jsonConfig.set('nodejs', 'design patterns');
jsonConfig.save('app/samples/conf_mod.json');
