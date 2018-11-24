﻿using Xataris.Domain.Pocos;

namespace Xataris.Infrastructure.ViewModels
{
    public class UploadInventoryViewModel : UserIdInput
    {
        public long WarehousesId { get; set; }
        public InventoryViewModel[] Inventory { get; set; }
    }

    public class InventoryViewModel : UserIdInput
    {
        public string StockCode { get; set; }
        public string StockDescription { get; set; }
        public string Level { get; set; }
        public string UnitCostPrice { get; set; }
    }

    public class Inventory : UserIdInput
    {
        public WarehousePoco Warehouse { get; set; }
        public MaterialPoco Material { get; set; }
        public decimal Quantity { get; set; }
    }
}
