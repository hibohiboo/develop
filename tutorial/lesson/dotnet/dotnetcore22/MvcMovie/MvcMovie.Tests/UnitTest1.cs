using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using MvcMovie.Controllers;
using MvcMovie.Core.Interfaces;
using MvcMovie.Models;
using Xunit;
using System.Linq;

namespace MvcMovie.Tests
{
    public class UnitTest1
    {
        [Fact]
        public async Task Index_ReturnsAViewResult_WithAListOfBrainstormSessions()
        {
            // Arrange
            var mockRepo = new Mock<IMovieRepository>();
            var movies = new List<Movie> { new Movie { Id = 1, Title = "test", Genre = "Test", Price = 10 } };
            mockRepo.Setup(repo => repo.ListAsync(""))
                .ReturnsAsync(movies);

            MoviesController controller = new MoviesController(mockRepo.Object);

            // Act
            var result = await controller.Index("");

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsAssignableFrom<IEnumerable<Movie>>(
                viewResult.ViewData.Model);
            Assert.Equal(1, model.Count());
        }
    }
}
