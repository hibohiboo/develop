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
        public static async Task RunOrchestrator(
            [OrchestrationTrigger] IDurableOrchestrationContext context, ILogger log)
        {
            log = context.CreateReplaySafeLogger(log);
            var tasks = new List<Task>();
            var i = context.GetInput<int>();

            for (var i = 0; i < 10; i++) {
                 tasks.Add(context.CallActivityAsync("SQLTest", i));
            }
            try {
                await Task.WhenAll(tasks);
            } catch (Exception e) {
                log.LogError($"Error RunOrchestrator: ", e);
            }
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
        public async Task SQLTest([ActivityTrigger] int num, ILogger log)
        {
            log.LogInformation($"SQL start {num}.");
            if (num == 0 || num == 6) throw new Exception();
            if (await ExistsUser(num))
            {
                log.LogInformation($"SQL stop {num}. already inserted");
                return;
            }
            var sql = "insert into Users(Id, Name) values (@Id, @Name)";

            using (SqlCommand command = new SqlCommand(sql, _con))
            {
                command.Parameters.AddWithValue("@Id", num);
                command.Parameters.AddWithValue("@Name", $"name{num}");
                await command.ExecuteNonQueryAsync();
            }
            log.LogInformation($"SQL end {num}.");
        }

        private async Task<bool> ExistsUser(int num)
        {
            var sql = "select Id from Users where Id = @Id";
            using (SqlCommand command = new SqlCommand(sql, _con))
            {
                command.Parameters.AddWithValue("@Id", num);
                using (SqlDataReader reader = await command.ExecuteReaderAsync())
                {
                    while (reader.Read())
                    {
                        Console.WriteLine("{0}", reader.GetInt32(0));
                        return reader.GetInt32(0) == num;
                    }
                }
                return false;
            }
        }
    }
}