namespace Xataris.Domain.Pocos
{
    public class PredefinedItem
    {
        public long PredefinedItemsId { get; set; }
        public long ItemsId { get; set; }
        public long ProductsId { get; set; }
        public decimal Quantity { get; set; }

        public Item Item { get; set; }
        public Product Product { get; set; }
    }
}
