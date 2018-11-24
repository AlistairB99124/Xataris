using System.Collections.Generic;

namespace Xataris.Domain.Pocos
{
    public class ItemTypeGroup
    {
        public long ItemTypeGroupsId { get; set; }
        public string Name { get; set; }

        public List<ItemType> ItemTypes { get; set; }
    }
}
