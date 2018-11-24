using System.Collections.Generic;

namespace Xataris.Domain.Pocos
{
    public class Item
    {
        public long ItemsId { get; set; }
        public long ItemTypesId { get; set; }
        public long SuppliersId { get; set; }
        public decimal UnitPrice { get; set; }
        public string Metric { get; set; }
        public string Name { get; set; }
        
        public List<PredefinedItem> PredefinedItems { get; set; }
        public List<ItemInventory> ItemInventories { get; set; }
        public List<QuoteItem> QuoteItems { get; set; }

        public ItemType ItemType { get; set; }
        public Supplier Supplier { get; set; }
    }
}
