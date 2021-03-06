using System;
using Xunit;
using FunctionApp1;
using Microsoft.Extensions.Logging;
using Moq;

namespace XUnitTestProject1
{
    public static class MyMockExtension
    {

        public static Mock<ILogger<T>> VerifyLogging<T>(this Mock<ILogger<T>> logger, string expectedMessage = null, LogLevel expectedLogLevel = LogLevel.Debug, Times? times = null)
        {
            times ??= Times.Once();

            Func<object, Type, bool> state = (v, t) => v.ToString().CompareTo(expectedMessage) == 0;

            logger.Verify(
                x => x.Log(
                    It.Is<LogLevel>(l => l == expectedLogLevel),
                    It.IsAny<EventId>(),
                    It.Is<It.IsAnyType>((v, t) => expectedMessage == null ? true : state(v, t)),
                    It.IsAny<Exception>(),
                    It.Is<Func<It.IsAnyType, Exception, string>>((v, t) => true)), (Times)times);

            return logger;
        }

        public static Mock<ILogger> VerifyLogging(this Mock<ILogger> logger, string expectedMessage, LogLevel expectedLogLevel = LogLevel.Debug, Times? times = null)
        {
            times ??= Times.Once();

            Func<object, Type, bool> state = (v, t) => v.ToString().CompareTo(expectedMessage) == 0;

            logger.Verify(
                x => x.Log(
                    It.Is<LogLevel>(l => l == expectedLogLevel),
                    It.IsAny<EventId>(),
                    It.Is<It.IsAnyType>((v, t) => state(v, t)),
                    It.IsAny<Exception>(),
                    It.Is<Func<It.IsAnyType, Exception, string>>((v, t) => true)), (Times)times);

            return logger;
        }
    }

    public class UnitTest1
    {
        [Fact]
        public void Test_ログの確認_引数複数_拡張()
        {
            var loggerMock = new Mock<ILogger<Mock>>();

            Assert.True(LogTest.LogWrite(loggerMock.Object));
            loggerMock.VerifyLogging("test a:a b:b c:c", LogLevel.Warning)
                .VerifyLogging("test a:1", LogLevel.Information)
                .VerifyLogging("test")
                .VerifyLogging("test2", LogLevel.Debug, Times.AtLeastOnce());
            // 呼び出されることのみ確認
            loggerMock.VerifyLogging(null, LogLevel.Warning);
            loggerMock.VerifyLogging(null, LogLevel.Error, Times.Never());
            loggerMock.VerifyLogging(null, LogLevel.Debug, Times.Exactly(3));
            loggerMock.VerifyLogging("testaaa", LogLevel.Warning, Times.Never());

            // 呼び出されないことの確認
            loggerMock.VerifyLogging("test", LogLevel.Information, Times.Never());
            // loggerMock.VerifyLogging("test", LogLevel.Debug, Times.Never()); これは失敗する
        }
    }
}

