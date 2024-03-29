﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Moq;
using MvcMovie.Controllers;
using MvcMovie.Core.Interfaces;
using MvcMovie.Core.Models;
using Xunit;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace MvcMovie.Test.Controllers
{
    public class MovieControllerTest
    {
        [Fact]
        public async Task Index_Movieが１つ入ったモデルをもったViewResultが返ること()
        {
            // Arrange
            var mockRepo = new Mock<IMovieRepository>();
            var movies = new List<Movie> { new Movie { Id = 1, Title = "test", Genre = "Test", Price = 10 }  };
            mockRepo.Setup(repo => repo.ListAsync())
                .ReturnsAsync(movies);

            MoviesController controller = new MoviesController(mockRepo.Object);

            // Act
            var result = await controller.Index();

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsAssignableFrom<IEnumerable<Movie>>(
                viewResult.ViewData.Model);
            Assert.Equal(1, model.Count());
        }

    }
}
