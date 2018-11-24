using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xataris.Application.Interfaces;
using Xataris.DBService;
using Xataris.Domain.Interfaces;
using Xataris.Domain.Pocos;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.Application.Implimentations
{
    public class Warehouse : IWarehouse
    {
        private readonly IWarehouseDomain _warehouse;
        private readonly XatarisContext _context;

        public Warehouse(IWarehouseDomain warehouse, XatarisContext context)
        {
            _warehouse = warehouse;
            _context = context;
        }


        public async Task<SimpleResult> AddWarehouse(AddWarehouseInput input)
        {
            try
            {
                var poco = new WarehousePoco
                {
                    Name = input.Name,
                    UserId = input.UserId
                };
                return await _warehouse.AddWarehouse(poco);
            }
            catch
            {
                return new SimpleResult
                {
                    IsSuccess = false
                };
            }
        }

        public async Task<WarehousePoco[]> GetWarehouses()
        {
            return await _context.Warehouses.Where(x => x.Deleted == false).ToAsyncEnumerable().ToArray();
        }

        public async Task<SimpleResult> DeleteWarehouse(WarehousesIdInput input)
        {
            try
            {
                return await _warehouse.DeleteWarehouse(input);
            }
            catch
            {
                return new SimpleResult
                {
                    IsSuccess = false
                };
            }
        }
    }
}
