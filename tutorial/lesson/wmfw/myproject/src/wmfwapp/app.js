/** Express
 * @file Expressサーバの基本設定を行う
 * 
 * @module app
 * @requires express
 * @requires morgan
 * 
 * @author hibohiboo
 */

import express from 'express'; // expressサーバ
import fs from 'fs';           // ファイル操作
import log4js from 'log4js';   // ロガー

import index from './routes/index'; // ルーティングファイル

// ログ出力ディレクトリ
const logDirectory = '/wmfw/dist/logs';

// ディレクトリが無ければ作成
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// ロガー設定
const logger = log4js.getLogger('wmfw.app');
logger.setLevel('DEBUG');

const app = express();
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));
app.use('/', index);

module.exports = app;

