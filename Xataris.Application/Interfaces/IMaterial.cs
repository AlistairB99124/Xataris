using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xataris.Domain.Pocos;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.Application.Interfaces
{
    public interface IMaterial
    {
        Task<SimpleResult> SaveMaterial(MaterialViewModel input);
        Task<SimpleResult> SaveMaterials(UploadInventoryViewModel input);
        Task<MaterialViewModel[]> GetMaterials();
        Task<InventoryPoco[]> GetInventory();
        Task<IDropdownModel<string>[]> GetUsers();
        Task<List<InventoryViewModel>> GetInventoryByWarehouse(WarehouseIdInput input);
    }
}
