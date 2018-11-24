using System;
using System.Collections.Generic;
using System.Text;

namespace Xataris.Domain.Pocos
{
    public class OrderItemPoco : TrackedEntity
    {
        public string StockCode { get; set; }
        public string StockDescription { get; set; }
        public decimal StockCost { get; set; }
        public decimal Quantity { get; set; }
        public long OrderId { get; set; }
        public OrderPoco Order { get; set; }
    }
}
