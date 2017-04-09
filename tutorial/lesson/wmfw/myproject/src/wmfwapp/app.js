/** Express
 * @file Expressサーバの基本設定を行う
 * 
 * @module app
 * @requires express
 * @requires morgan
 * 
 * @author hibohiboo
 */

// expressサーバ
import express from 'express';

// access logger
// import morgan from 'morgan';
import fs from 'fs';
// import rfs from 'rotating-file-stream';

// logger
import log4js from 'log4js';

const logger = log4js.getLogger('wmfw');
logger.setLevel('DEBUG'); //

// ログ出力ディレクトリ
const logDirectory = '/wmfw/dist/logs';
// ディレクトリが無ければ作成
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const app = express();

app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));

/**
 * ルートのコントローラ
 * @name get /
 * @function
 * @memberof module:app
 * @inner
 * @param {string} path Expressが処理するルーティングパス
 * @param {callback} middlewear - Expressのミドルウェア
 */
app.get('/', (req, res) => {
logger.trace('trace log4js');
logger.debug('ddbug log4js');
logger.info('info log4js');
logger.warn('warn log4js');
logger.error('error log4js');
logger.fatal('fatal log4js');
  res.send('Hello World!');

});



module.exports = app;

