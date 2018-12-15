using System.Threading.Tasks;
using Xataris.Domain.Pocos;

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
