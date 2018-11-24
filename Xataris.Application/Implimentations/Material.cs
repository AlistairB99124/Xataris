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
        private readonly XatarisContext _context;

        public Material(IMaterialDomain material, XatarisContext context)
        {
            _material = material;
            _context = context;
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

        public async Task<InventoryViewModel[]> GetInventoryByWarehouse(WarehouseIdInput input)
        {
            try
            {
                var InvResult = await _context.Inventories.Where(x => x.WarehouseId == input.WarehousesId).ToListAsync();
                if (InvResult.Count == 0)
                {
                    return new List<InventoryViewModel>{
                        new InventoryViewModel
                    {
                        Level = "No Data",
                        StockCode = "No Data",
                        StockDescription = "No Data",
                        UnitCostPrice = "No Data"
                    }
                    }.ToArray();
                }
                else
                {
                    return InvResult.Select(x => new InventoryViewModel
                    {
                        Level = x.Quantity.ToString(),
                        StockCode = _context.Materials.Where(o => o.Id == x.MaterialId).FirstOrDefault().StockCode.ToString(),
                        StockDescription = _context.Materials.Where(o => o.Id == x.MaterialId).FirstOrDefault().StockDescription,
                        UnitCostPrice = _context.Materials.Where(o => o.Id == x.MaterialId).FirstOrDefault().Cost.ToString()
                    }).ToArray();
                }
            }
            catch
            {
                return new List<InventoryViewModel>{
                    new InventoryViewModel
                {
                    Level = "Error",
                    StockCode = "Error",
                    StockDescription = "Error",
                    UnitCostPrice = "Error"
                }
                }.ToArray();
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
                var existingInventory = warehouse.Inventory;
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
                            Cost = Convert.ToDecimal(inv.UnitCostPrice, CultureInfo.InvariantCulture),
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
                            Quantity = Convert.ToDecimal(inv.Level, CultureInfo.InvariantCulture),
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
                            Quantity = Convert.ToDecimal(inv.Level, CultureInfo.InvariantCulture),
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
