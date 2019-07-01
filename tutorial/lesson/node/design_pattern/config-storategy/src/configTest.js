"use strict";

const Config = require('./config');
const strategies = require('./strategies');

const jsonConfig = new Config(strategies.json);
jsonConfig.read('app/samples/conf.json');
jsonConfig.set('book.nodejs', 'design patterns');
jsonConfig.save('app/samples/conf_mod.json');

const iniConfig = new Config(strategies.ini);
iniConfig.read('app/samples/conf.ini');
iniConfig.set('book.nodejs', 'design patterns');
iniConfig.save('app/samples/conf_mod.ini');
