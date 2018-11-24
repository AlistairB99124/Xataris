using System;
using System.Collections.Generic;
using System.Text;

namespace Xataris.Domain.Pocos
{
    public class OrderPoco : TrackedEntity
    {
        public DateTime DateCreated { get; set; }
        public string Plumber { get; set; }
        public string Site { get; set; }
        public List<OrderItemPoco> OrderItems { get; set; }
        public string GUID { get; set; }
    }
}
