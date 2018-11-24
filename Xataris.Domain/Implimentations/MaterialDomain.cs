using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xataris.DBService;
using Xataris.Domain.Interfaces;
using Xataris.Domain.Pocos;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.Domain.Implimentations
{
    public class MaterialDomain : IMaterialDomain
    {
        private XatarisContext _context;

        public MaterialDomain(XatarisContext context)
        {
            _context = context;
        }

        public async Task<SimpleResultPoco> EditInventory(InventoryPoco[] input)
        {
            await Task.Run(() => { _context.Inventories.UpdateRange(input); });
            await _context.SaveChangesAsync();
            return new SimpleResultPoco
            {
                IsSuccess = true
            };
        }

        public async Task<SimpleResultPoco> SaveInventory(InventoryPoco[] input)
        {
            var existingMaterials = _context.Materials.ToList();
            var newInvMaterials = input.Select(x => new MaterialPoco
            {
                Cost = x.Material.Cost,
                StockCode = x.Material.StockCode,
                Id = x.Material.Id,
                StockDescription = x.Material.StockDescription
            }).ToList();
            var newMat = existingMaterials.Except(newInvMaterials).ToList();
            await _context.Materials.AddRangeAsync(newMat);
            await _context.SaveChangesAsync();
            await _context.Inventories.AddRangeAsync(input);
            await _context.SaveChangesAsync();
            return new SimpleResultPoco
            {
                IsSuccess = true
            };
        }

        public async Task<SimpleResultPoco> SaveMaterial(MaterialPoco input)
        {
            await _context.Materials.AddAsync(input);
            var id = await _context.SaveChangesAsync();
            return new SimpleResultPoco
            {
                IsSuccess = true,
                Id = Convert.ToInt64(id)
            };
        }

        public async Task<SimpleResultPoco> SaveMaterials(MaterialPoco[] input)
        {
            await _context.AddRangeAsync(input);
            await _context.SaveChangesAsync();
            return new SimpleResultPoco
            {
                IsSuccess = true
            };
        }
    }
}
