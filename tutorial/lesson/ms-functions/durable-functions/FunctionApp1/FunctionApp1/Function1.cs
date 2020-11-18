using System;
using System.Collections.Generic;
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

            // Replace "hello" with the name of your Durable Activity Function.
            for(var i = 0; i<5; i++)
            {
                // void1‚Å‚àawait‚·‚é‚Æ“¯Šú“I‚ÉŽÀs‚µ‚Ä‚µ‚Ü‚¤
                try
                {
                    // await context.CallActivityAsync<string>("WaitTest", i);
                    context.CallActivityAsync("WaitTest", i);
                }
                catch(Exception e)
                {
                    log.LogError($"error orcestration: {i}", e);
                }
            }
            //outputs.Add(await context.CallActivityAsync<string>("Function1_Hello", "Tokyo"));
            //outputs.Add(await context.CallActivityAsync<string>("Function1_Hello", "Seattle"));
            //outputs.Add(await context.CallActivityAsync<string>("Function1_Hello", "London"));

            // returns ["Hello Tokyo!", "Hello Seattle!", "Hello London!"]
            //return outputs;
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
}