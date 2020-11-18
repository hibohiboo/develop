
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;
using System.Configuration;
using System;

[assembly: FunctionsStartup(typeof(FunctionApp1.Startup))]

namespace FunctionApp1
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            //builder.Services.AddHttpClient();
            // https://docs.microsoft.com/ja-jp/azure/azure-functions/functions-dotnet-dependency-injection
            // https://blog.shibayan.jp/entry/20190921/1569050986
            builder.Services.AddSingleton((s) => {
                var sqlConnection = Environment.GetEnvironmentVariable("SQLServerConnectionString");
                var con = new SqlConnection(sqlConnection);
                con.Open();
                return con;
            });

            // builder.Services.AddSingleton<ILoggerProvider>();
        }
    }
}