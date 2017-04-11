/** Express
 * @file Expressサーバの基本設定を行う
 *
 * @module app
 * @requires express
 * @requires morgan
 *
 * @author hibohiboo
 */

// node.jsのモジュール
import fs from 'fs';           // ファイル操作
import path from 'path';       // パス

// フレームワーク
import express from 'express'; // expressサーバ

// ミドルウェア
import log4js from 'log4js';         // ロガー
import favicon from 'serve-favicon'; // favicon
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

// アプリケーション
import index from './routes/index'; // ルーティングファイル

// ログ出力ディレクトリ
const logDirectory = '/wmfw/dist/logs';

// ディレクトリが無ければ作成
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// ロガー設定
const logger = log4js.getLogger('wmfw.app');

const app = express();

// セキュリティ
app.use(helmet());

// log4jのアクセスログ設定
app.use(log4js.connectLogger(log4js.getLogger('http'), { level: 'auto' }));

// json文字列をオブジェクトとして格納
app.use(bodyParser.json());

// urlのkey-valueのペアをオブジェクトとして格納
app.use(bodyParser.urlencoded({ extended: false }));

// cookieをオブジェクトとして格納
app.use(cookieParser());

// favicon設定
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// view engine 設定
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 静的ファイルの設定
app.use('/public', express.static(path.join(__dirname, 'public')));

// ルーティングファイルにデータを渡す
app.use('/', index);

module.exports = app;

