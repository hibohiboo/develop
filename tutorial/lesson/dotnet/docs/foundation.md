# asp.net tutorial

TODO:docs ディレクトリに移す

wmfwのtutorialの参考のためにasp.net core getting startedから機能を試す。

## 概要

### Program.cs

.net coreは単なるコンソールアプリケーションである。
Mainメソッドの中で、Webサーバを生成する。

[Program.cs](https://github.com/hibohiboo/develop/tree/f912e84866265edd9259b28fe88e3bca5ae67538/tutorial/lesson/dotnet/dotnet/myproject/src/aspnetcoreapp/Program.cs)

## Startup.cs

### 役割
* リクエスト処理パイプラインを定義
* アプリケーションで必要なサービスを構成

### 条件
* publicなクラスであること
* 次のメソッドを実装していること
  * public void ConfigureServices(IServiceCollection services)
  * public void Configure(IApplicationBuilder app)

### ConfigureServices

アプリケーション(ASP.NET MVC Core framework、Entity Framework Core、Identity、など)で使用されるサービスを定義

#### Services
Service はアプリケーションで共通的に使用されることを意図したコンポーネント。
Service はDependency Injection (DI) によって使用可能になる。
ASP.NET Core はシンプルなビルトイン Inversion of Control (IoC) コンテナを含む。IoC コンテナはデフォルトでコンストラクタインジェクションをサポートする。

##### Dependency Injectionのメリット
* 疎結合
* アプリ全体で Service を利用可能
  * 例)logging サービス

### Configure
リクエストパイプラインにおける middleware を定義

#### Middleware
ASP.NET Core では、Middleware を使用してリクエストパイプラインを構成する。

#### Middlewareの機能
  *  HttpContext 上で非同期ロジックを実行し、シーケンス内の次の Middorware を呼び出す
  * リクエストを直接終了

#### Middlewareの使い方
依存性をNuGet パッケージで管理。
Configure メソッド内で IApplicationBuilder で `UseXYZ` 拡張メソッドを呼び出すことによって Middleware を使用する。

ASP.NET Core では任意の OWIN ベースの Middleware を使用できる。
また、独自のカスタム Middleware を作成することができる。

## サーバー
HTTPサーバーから、リクエストをアプリケーションに転送する。
転送されたリクエストは、HttpContext に構成された機能インターフェースのセットとしてラップされる。

ASP.NET Coreには Kestrel と呼ばれるマネージドクロスプラットフォーム Web サーバーが含まれている。

## Content root
Content root は view や Web content など、アプリケーションで使用されるあらゆるコンテンツへの基本パス。
デフォルトでは、Content root は、アプリケーションをホストする実行可能ファイルへのアプリケーション基本パスと同じ。
` WebHostBuilder` で別の場所を指定可能。

## Web root
アプリケーションの Web root とは、プロジェクト内の、css、js、image ファイルなどのパブリックな静的リソースを格納するためのディレクトリを指す。

Static files Middleware は、デフォルトでは、Web root ディレクトリ(およびサブディレクトリ)からのファイルのみを提供する。
Web root パスのデフォルトは <content root>/wwwrootだが、WebHostBuilder を使用して別の場所を指定することも可能。

## Configuration
構成はjson,xml,iniなど様々なファイル形式で設定可能。

## 環境
"Development" や "Production" のような環境は、ASP.NET Core のファーストクラスの概念であり、環境変数を使用して設定できる。

## Entity Framework
は .NET Core または .NET Framework 実行環境を使用できる。

## 参考
[asp.net core 概要 日本語版][*1]  
[asp.net core 英語版][*2]  
[POCO][*3]

[*1]:http://qiita.com/tkiryu/items/e1d7fe62642fcc67cf47
[*2]:https://docs.microsoft.com/ja-jp/aspnet/core/fundamentals/
[*3]:http://www.atmarkit.co.jp/fdotnet/ef4basic/ef4basic05/ef4basic05_01.html