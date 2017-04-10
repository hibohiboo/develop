# helmet

helmetで行われるセキュリティ。

| Module | 説明 | Default? |
|---|---|---|
| [contentSecurityPolicy](https://helmetjs.github.io/docs/csp/) | クロスサイト・スクリプティング攻撃やその他のクロスサイト・インジェクションを防止するために Content-Security-Policy ヘッダーを設定。| |
| [dnsPrefetchControl](https://helmetjs.github.io/docs/dns-prefetch-control) |外部ドメイン名（ホスト名）の名前解決（DNSルックアップ）を事前に強制.デフォルト値はoff。  |✓ |
| [frameguard](https://helmetjs.github.io/docs/frameguard/)| クリックジャッキング保護を有効にするために X-Frame-Options ヘッダーを設定 | ✓ |
| [hidePoweredBy](https://helmetjs.github.io/docs/hide-powered-by) | X-Powered-By ヘッダーを削除 | ✓ |
| [hpkp](https://helmetjs.github.io/docs/hpkp/) | 偽の証明書による中間者攻撃を防止するために Public Key Pinning ヘッダーを追加 |  |
| [hsts](https://helmetjs.github.io/docs/hsts/) | サーバーへのセキュア (SSL/TLS を介して HTTP) 接続を適用する Strict-Transport-Security ヘッダーを設定 | ✓ |
| [ieNoOpen](https://helmetjs.github.io/docs/ienoopen) | IE8+ の X-Download-Options を設定 | ✓ |
| [noCache](https://helmetjs.github.io/docs/nocache/) | クライアント側のキャッシュを無効にするために Cache-Control ヘッダーと Pragma ヘッダーを設定 |  |
| [noSniff](https://helmetjs.github.io/docs/dont-sniff-mimetype) | 宣言されているコンテンツの種類からの応答をブラウザーが MIME スニッフィングしないように、X-Content-Type-Options を設定 | ✓ |
| [referrerPolicy](https://helmetjs.github.io/docs/referrer-policy) |  Referer headerを隠す |  |
| [xssFilter](https://helmetjs.github.io/docs/xss-filter) | 最新の Web ブラウザーでクロスサイト・スクリプティング (XSS) フィルターを有効にするために X-XSS-Protection を設定 | ✓ |

## 参考

[best-practice][*1]    
[github][*2]

[*1]:http://expressjs.com/ja/advanced/best-practice-security.html
[*2]:https://github.com/helmetjs/helmet