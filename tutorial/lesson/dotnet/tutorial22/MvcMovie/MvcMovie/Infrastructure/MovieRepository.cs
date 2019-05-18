using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MvcMovie.Core.Interfaces;
using MvcMovie.Core.Models;
using MvcMovie.Models;

namespace MvcMovie.Infrastructure
{
    public class MovieRepository :  Repository<Movie, int>, IMovieRepository
    {
        private readonly MvcMovieContext _dbContext;

        public MovieRepository(MvcMovieContext dbContext):base(dbContext)
        {
            _dbContext = dbContext;
        }

        public override Task<Movie> GetByIdAsync(int id)
        {
            return this.GetByIdAsync(m => m.Id == id);
        }

        public override bool Exists(int id)
        {
            return this.Exists(e => e.Id == id);
        }
    }
}
