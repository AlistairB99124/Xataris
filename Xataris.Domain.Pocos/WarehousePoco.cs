using System;
using System.Collections.Generic;
using System.Text;

namespace Xataris.Domain.Pocos
{
    public class WarehousePoco : TrackedEntity
    {
        public string Name { get; set; }
        public string UserId { get; set; }
        public UserPoco User { get; set; }
        public List<InventoryPoco> Inventory { get; set; }
    }
}
