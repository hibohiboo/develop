using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using MvcMovie.Controllers;
using MvcMovie.Models;
using Xunit;

namespace MvcMovie.Tests
{
    public class UnitTest1
    {
        [Fact]
        public async Task Index_ReturnsAViewResult_WithAListOfBrainstormSessions()
        {
            // Arrange
            var mockRepo = new Mock<MvcMovieContext>();
            //mockRepo.Setup(repo => repo.Movie)
            //    .ReturnsAsync(GetTestSessions());

            MoviesController controller = new MoviesController(mockRepo.Object);

            // Act
            var result = await controller.Index("");

            //// Assert
            //var viewResult = Assert.IsType<ViewResult>(result);
            //var model = Assert.IsAssignableFrom<IEnumerable<StormSessionViewModel>>(
            //    viewResult.ViewData.Model);
            //Assert.Equal(2, model.Count());
        }
    }
}
