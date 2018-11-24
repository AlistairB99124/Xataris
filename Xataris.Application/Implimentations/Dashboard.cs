using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xataris.Application.Interfaces;
using Xataris.DBService;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.Application.Implimentations
{
    public class Dashboard : IDashboard
    {
        private readonly XatarisContext _context;

        public Dashboard(XatarisContext context)
        {
            _context = context;
        }
        public async Task<StackedGraphResult> GetInventoryByWarehouse()
        {
            try
            {
                var result = await _context.Inventories.GroupBy(x => x.WarehouseId).ToListAsync();
                return new StackedGraphResult
                {
                    Columns = result.Select(x => new Column
                    {
                        Name = _context.Warehouses.Where(d => d.Id == x.FirstOrDefault().WarehouseId).FirstOrDefault().Name,
                        Series = new List<Series>
                          {
                              new Series
                              {
                                   Name = "Quantity",
                                   Value = x.Sum(s => s.Quantity)
                              }
                          }.ToArray()
                    }).ToArray()
                };
            }
            catch
            {
                return new StackedGraphResult();
            }
        }

        public async Task<InventoryViewModel[]> GetInventoryByWarehouseId(WarehouseInput input)
        {
            try
            {
                var warehouse = await _context.Warehouses.Where(x => x.Name == input.Name).FirstOrDefaultAsync();
                var result = await _context.Inventories.Where(x => x.WarehouseId == warehouse.Id).ToListAsync();
                return result.Select(x => new InventoryViewModel
                {
                    Level = x.Quantity.ToString(),
                    StockCode = _context.Materials.Where(s => s.Id == x.MaterialId).FirstOrDefault().StockCode,
                    StockDescription = _context.Materials.Where(s => s.Id == x.MaterialId).FirstOrDefault().StockDescription,
                    UnitCostPrice = _context.Materials.Where(s => s.Id == x.MaterialId).FirstOrDefault().Cost.ToString("F2"),
                }).ToArray();
            }
            catch
            {
                return new List<InventoryViewModel>().ToArray();
            }
        }
    }
}
