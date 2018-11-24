using System;
using System.Collections.Generic;
using System.Text;

namespace Xataris.Domain.Pocos
{
    public class InventoryPoco : TrackedEntity
    {
        public long WarehouseId { get; set; }
        public long MaterialId { get; set; }
        public decimal Quantity { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime DateModified { get; set; }
        public string ModifiedBy { get; set; }
        public MaterialPoco Material { get; set; }
        public WarehousePoco Warehouse { get; set; }
    }
}
