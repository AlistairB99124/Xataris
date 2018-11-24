using Xataris.Domain.Pocos;

namespace Xataris.Infrastructure.ViewModels
{
    public class DataTabResult
    {
        public PredefinedItem[] PredefinedItems { get; set; }
        public Customer[] Customers { get; set; }
        public ItemInventory[] ItemInventories { get; set; }
        public Item[] Items { get; set; }
        public ItemType[] ItemTypes { get; set; }
        public ItemTypeGroup[] ItemTypeGroups { get; set; }
        public Supplier[] Suppliers { get; set; }
        public Quote[] Quotes { get; set; }
        public QuoteItem[] QuoteItems { get; set; }
        public QuoteProduct[] QuoteProducts { get; set; }
        public Product[] Products { get; set; }
        public UserPoco[] Users { get; set; }
    }
}
