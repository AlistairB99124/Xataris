using System;
using System.Collections.Generic;
using System.Text;

namespace Xataris.Domain.Pocos
{
    public class MaterialPoco : TrackedEntity
    {
        public string StockCode { get; set; }
        public string StockDescription { get; set; }
        public decimal Cost { get; set; }
        public List<InventoryPoco> Inventory { get; set; }
    }
}
