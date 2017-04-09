using Microsoft.AspNetCore.Hosting;

namespace MyApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder() // builder パターン。アプリケーションホスト生成
                .UseKestrel() // kestrel webサーバを使用
                .UseUrls("http://0.0.0.0:5001") // dockerコンテナに外からアクセスするために0.0.0.0のアドレスで起動
                .UseStartup<Startup>()
                .Build();  // IWebHost オブジェクトを生成

            host.Run(); // HTTP リクエストのリスニングを開始
        }
    }
}
