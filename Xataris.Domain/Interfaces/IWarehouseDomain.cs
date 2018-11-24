using System.Threading.Tasks;
using Xataris.Domain.Pocos;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.Domain.Interfaces
{
    public interface IWarehouseDomain
    {
         Task<SimpleResult> AddWarehouse(WarehousePoco input);
        Task<SimpleResult> DeleteWarehouse(WarehousesIdInput input);
    }
}
