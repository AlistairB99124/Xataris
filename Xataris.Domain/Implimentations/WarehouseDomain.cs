using System.Threading.Tasks;
using Xataris.DBService;
using Xataris.Domain.Interfaces;
using Xataris.Domain.Pocos;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.Domain.Implimentations
{
    public class WarehouseDomain : IWarehouseDomain
    {
        private readonly XatarisContext _context;

        public WarehouseDomain(XatarisContext context)
        {
            _context = context;
        }

        public async Task<SimpleResult> AddWarehouse(WarehousePoco input)
        {
            await _context.Warehouses.AddAsync(input);
            await _context.SaveChangesAsync();
            return new SimpleResult
            {
                IsSuccess = true
            };
        }

        public async Task<SimpleResult> DeleteWarehouse(WarehousesIdInput input)
        {
            var poco = await GetWarehouse(input);
            poco.Deleted = true;
            _context.Entry(poco).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            await _context.SaveChangesAsync();
            return new SimpleResult
            {
                IsSuccess = true
            };
        }

        private async Task<WarehousePoco> GetWarehouse(WarehousesIdInput input)
        {
            return await _context.Warehouses.FindAsync(input.WarehouseId);
        }
    }
}
