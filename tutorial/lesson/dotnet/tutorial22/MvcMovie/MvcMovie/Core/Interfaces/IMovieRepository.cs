using MvcMovie.Core.Models;

namespace MvcMovie.Core.Interfaces
{
    public interface IMovieRepository : IRepository<Movie, int> { }
}
