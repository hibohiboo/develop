using System.Collections.Generic;
using System.Threading.Tasks;

namespace MvcMovie.Core.Interfaces
{
    public interface IRepository<Type, Key>
    {
        Task<Type> GetByIdAsync(Key key);
        Task<List<Type>> ListAsync();
        Task AddAsync(Type type);
        Task UpdateAsync(Type type);
        Task DeleteAsync(Type type);
        bool Exists(Key key);
    }
}
