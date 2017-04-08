# asp.net tutorial

TODO:docs ディレクトリに移す

wmfwのtutorialの参考のためにasp.net core getting startedから機能を試す。

## 概要

### Program.cs

.net coreは単なるコンソールアプリケーションである。
Mainメソッドの中で、Webサーバを生成する。

Program.cs
```csharp
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;

namespace src
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseUrls("http://0.0.0.0:5001") // <-----
                .UseStartup<Startup>()
                .Build();

            host.Run();
        }
    }
}

```


## 参考
[asp.net core 概要 日本語版][*1]  
[asp.net core 英語版][*2]  


[*1]:http://qiita.com/tkiryu/items/e1d7fe62642fcc67cf47
[*2]:https://docs.microsoft.com/ja-jp/aspnet/core/fundamentals/
