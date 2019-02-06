using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
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
    public class Material : IMaterial
    {
        private readonly IMaterialDomain _material;
        private readonly IProcedureService _procService;
        private readonly XatarisContext _context;

        public Material(IMaterialDomain material, XatarisContext context, IProcedureService procService)
        {
            _material = material;
            _context = context;
            _procService = procService;
        }

        public async Task<InventoryPoco[]> GetInventory()
        {
            try
            {
                return await _context.Inventories.ToAsyncEnumerable().ToArray();
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<InventoryViewModel>> GetInventoryByWarehouse(WarehouseIdInput input)
        {
            try
            {
                return await _procService.CallProcedureAsync<InventoryViewModel>("dbo.ReadInventoryFromWarehouse", new { input.WarehousesId });
            }
            catch
            {
                return new List<InventoryViewModel>();
            }
        }

        public async Task<MaterialViewModel[]> GetMaterials()
        {
            return await _context.Inventories.ToAsyncEnumerable().Select(x => new MaterialViewModel
            {
                StockCode = x.Material.StockCode,
                StockDescription = x.Material.StockDescription,
                UnitCostPrice = x.Material.Cost,
                WarehouseId = x.WarehouseId,
                Level = x.Quantity,
                Id = x.Material.Id
            }).ToArray();
        }

        public async Task<IDropdownModel<string>[]> GetUsers()
        {
            try
            {
                var result = await _context.Users.Where(x => x.PtmEnabled == true).ToListAsync();
                return result.Select(x => new IDropdownModel<string>
                {
                    Value = x.Id,
                    Text = x.LastName + ", " + x.FirstName,
                    Selected = false
                }).ToArray();
            }
            catch
            {
                return null;
            }
        }

        public async Task<SimpleResult> SaveMaterial(MaterialViewModel input)
        {
            try
            {
                var objParam = new MaterialPoco
                {
                    Cost = input.UnitCostPrice,
                    Id = input.Id,
                    StockCode = input.StockCode,
                    StockDescription = input.StockDescription
                };
                var result = await _material.SaveMaterial(objParam);
                return new SimpleResult
                {
                    IsSuccess = result.IsSuccess,
                    ErrorMessage = result.ErrorMessage,
                    Id = result.Id
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return new SimpleResult
                {
                    IsSuccess = false
                };
            }
        }

        public async Task<SimpleResult> SaveMaterials(UploadInventoryViewModel input)
        {
            try
            {
                var warehouse = await _context.Warehouses.FindAsync(input.WarehousesId);
                var existingInventory =_context.Inventories.Where(x => x.WarehouseId == warehouse.Id);
                if(existingInventory != null)
                {
                    _context.Inventories.RemoveRange(existingInventory);
                    await _context.SaveChangesAsync();
                }
                var newInventory = new List<InventoryPoco>();
                foreach (var inv in input.Inventory)
                {
                    var mat = _context.Materials.Where(x => x.StockCode == inv.StockCode).FirstOrDefault();
                    if (mat == null)
                    {
                        var material = new MaterialPoco
                        {
                            Cost = Convert.ToDecimal(inv.Cost, CultureInfo.InvariantCulture),
                            StockCode = inv.StockCode,
                            StockDescription = inv.StockDescription
                        };
                        _context.Materials.Add(material);
                        _context.SaveChanges();
                        var inventory = new InventoryPoco
                        {
                            DateAdded = DateTime.Now,
                            DateModified = DateTime.Now,
                            Deleted = false,
                            MaterialId = material.Id,
                            ModifiedBy = "",
                            Quantity = Convert.ToDecimal(inv.Quantity, CultureInfo.InvariantCulture),
                            WarehouseId = input.WarehousesId
                        };
                        newInventory.Add(inventory);
                    }
                    else
                    {
                        var inventory = new InventoryPoco
                        {
                            DateAdded = DateTime.Now,
                            DateModified = DateTime.Now,
                            Deleted = false,
                            MaterialId = mat.Id,
                            ModifiedBy = "",
                            Quantity = Convert.ToDecimal(inv.Quantity, CultureInfo.InvariantCulture),
                            WarehouseId = input.WarehousesId
                        };
                        newInventory.Add(inventory);
                    }
                }
                await _context.AddRangeAsync(newInventory);
                await _context.SaveChangesAsync();
                return new SimpleResult
                {
                    IsSuccess = true
                };
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
