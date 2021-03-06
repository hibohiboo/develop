using Microsoft.Extensions.Logging;
namespace FunctionApp1
{
    public class LogTest
    {
        public static bool LogWrite(ILogger logger)
        {
            logger.LogWarning("test a:{0} b:{1} c:{2}", "a", "b", "c");
            logger.LogInformation("test a:{0}", "1");
            logger.LogDebug("test");
            logger.LogDebug("test2");
            logger.LogDebug("test2");

            return true;
        }
    }
}
