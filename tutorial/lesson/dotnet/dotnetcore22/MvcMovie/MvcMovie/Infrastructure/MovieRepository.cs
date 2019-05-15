using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MvcMovie.Core.Interfaces;
using MvcMovie.Models;

namespace MvcMovie.Infrastructure
{
    public class MovieRepository:IMovieRepository
    {
        private readonly MvcMovieContext _dbContext;

        public MovieRepository(MvcMovieContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Task<Movie> GetByIdAsync(int id)
        {
            return  _dbContext.Movie.FirstOrDefaultAsync(m => m.Id == id);
        }

        public Task<List<Movie>> ListAsync(string searchString)
        {
            var movies = from m in _dbContext.Movie
                         select m;

            if (!String.IsNullOrEmpty(searchString))
            {
                movies = movies.Where(s => s.Title.Contains(searchString));
            }

            return  movies.ToListAsync();
 
        }

        public Task AddAsync(Movie movie)
        {
            _dbContext.Add(movie);
            return _dbContext.SaveChangesAsync();
        }

        public Task UpdateAsync(Movie movie)
        {
            _dbContext.Update(movie);
            return _dbContext.SaveChangesAsync();
        }
        
        public Task DeleteAsync(Movie movie)
        {
            _dbContext.Movie.Remove(movie);
            return _dbContext.SaveChangesAsync();
        }

        public bool Exists(int id)
        {
            return _dbContext.Movie.Any(e => e.Id == id);
        }
    }
}
