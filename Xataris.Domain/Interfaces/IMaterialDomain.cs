using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xataris.Domain.Pocos;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.Domain.Interfaces
{
    public interface IMaterialDomain
    {
        Task<SimpleResultPoco> SaveMaterial(MaterialPoco input);
        Task<SimpleResultPoco> SaveMaterials(MaterialPoco[] input);
        Task<SimpleResultPoco> EditInventory(InventoryPoco[] input);
        Task<SimpleResultPoco> SaveInventory(InventoryPoco[] input);  
    }
}
