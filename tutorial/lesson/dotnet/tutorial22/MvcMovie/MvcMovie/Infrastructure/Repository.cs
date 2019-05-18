using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MvcMovie.Core.Interfaces;
using System.Threading;
using System.Linq.Expressions;

namespace MvcMovie.Infrastructure
{
    public abstract class Repository<Type, Key> : IRepository<Type, Key>
        where Type : class
    {
        private readonly DbContext _dbContext;

        public Repository(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public abstract Task<Type> GetByIdAsync(Key key);
        protected Task<Type> GetByIdAsync(Expression< Func<Type, bool>> func)
        {
            return _dbContext.Set<Type>().FirstOrDefaultAsync(func, default(CancellationToken));
        }

        public Task<List<Type>> ListAsync()
        {
            var movies = from m in _dbContext.Set<Type>()
                         select m;

            return movies.ToListAsync();

        }

        public Task AddAsync(Type type)
        {
            _dbContext.Add(type);
            return _dbContext.SaveChangesAsync();
        }

        public Task UpdateAsync(Type type)
        {
            _dbContext.Update(type);
            return _dbContext.SaveChangesAsync();
        }

        public Task DeleteAsync(Type type)
        {
            _dbContext.Set<Type>().Remove(type);
            return _dbContext.SaveChangesAsync();
        }
        public abstract bool Exists(Key key);
        protected bool Exists(Predicate<Type> func)
        {
            return _dbContext.Set<Type>().ToList().Exists(func);
        }
    }
}
