using System;
using System.Collections.Generic;
using System.Text;
using Xataris.Domain.Pocos;

namespace Xataris.Infrastructure.ViewModels
{
    //public class InventoryTimesheetViewModel
    //{
    //    public long Id { get; set; }
    //    public string StockCode { get; set; }
    //    public string StockDescription { get; set; }
    //    public decimal Quantity { get; set; }
    //    public long MaterialId { get; set; }
    //}

    public class InventoryTimesheetViewModel : UserIdInput
    {
        public MaterialPoco[] Materials { get; set; }
        public InventoryPoco[] Inventory { get; set; }
    }
}
