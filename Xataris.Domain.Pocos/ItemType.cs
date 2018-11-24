using System.Collections.Generic;

namespace Xataris.Domain.Pocos
{
    public class ItemType
    {
        public long ItemTypesId { get; set; }
        public long ItemTypeGroupsId { get; set; }
        public string Name { get; set; }

        public ItemTypeGroup ItemTypeGroup { get; set; }

        public List<Item> Items { get; set; }
    }
}
