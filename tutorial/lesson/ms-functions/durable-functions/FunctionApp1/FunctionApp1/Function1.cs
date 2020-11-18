using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.DurableTask;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

namespace FunctionApp1
{
    public static class Function1
    {
        [FunctionName("Function1")]
        public static void RunOrchestrator(
            [OrchestrationTrigger] IDurableOrchestrationContext context, ILogger log)
        {
            var outputs = new List<string>();

            for(var i = 0; i<5; i++)
            {
                try
                {
                    // await context.CallActivityAsync<string>("WaitTest", i);
                    context.CallActivityAsync("SQLTest", i);
                }
                catch(Exception e)
                {
                    log.LogError($"error orcestration: {i}", e);
                }
            }
        }

        [FunctionName("Function1_Hello")]
        public static string SayHello([ActivityTrigger] string name, ILogger log)
        {
            log.LogInformation($"Saying hello to {name}.");
            return $"Hello {name}!";
        }

        [FunctionName("Function1_HttpStart")]
        public static async Task<HttpResponseMessage> HttpStart(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestMessage req,
            [DurableClient] IDurableOrchestrationClient starter,
            ILogger log)
        {
            // Function input comes from the request content.
            string instanceId = await starter.StartNewAsync("Function1", null);

            log.LogInformation($"Started orchestration with ID = '{instanceId}'.");

            return starter.CreateCheckStatusResponse(req, instanceId);
        }


        [FunctionName("WaitTest")]
        public static void WaitTest([ActivityTrigger] int num, ILogger log)
        {
            log.LogInformation($"Wait start {num}.");
            if (num == 3) throw new Exception($"wait test {num}");
            System.Threading.Thread.Sleep(1000);
            log.LogInformation($"Wait end {num}.");
        }
    }
    public class SqlActivity
    {
        private readonly SqlConnection _con;
        public SqlActivity(SqlConnection con)
        {
            _con = con;
        }
        [FunctionName("SQLTest")]
        public void SQLTest([ActivityTrigger] int num, ILogger log)
        {
            log.LogInformation($"SQL start {num}.");
            var sql = "insert into Users(Id, Name) values (@Id, @Name)";

            using (SqlCommand command = new SqlCommand(sql, _con))
            {
                command.Parameters.AddWithValue("@Id", num);
                command.Parameters.AddWithValue("@Name", $"name{num}");
                command.ExecuteNonQuery();
            }
            log.LogInformation($"SQL end {num}.");
        }
    }
}