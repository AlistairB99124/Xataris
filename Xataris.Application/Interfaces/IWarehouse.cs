using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xataris.Domain.Pocos;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.Application.Interfaces
{
    public interface IWarehouse
    {
        Task<SimpleResult> AddWarehouse(AddWarehouseInput input);
        Task<WarehousePoco[]> GetWarehouses();
        Task<SimpleResult> DeleteWarehouse(WarehousesIdInput input);
    }
}
