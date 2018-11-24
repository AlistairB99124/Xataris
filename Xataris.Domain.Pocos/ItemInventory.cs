namespace Xataris.Domain.Pocos
{
    public class ItemInventory
    {
        public long ItemInventoriesId { get; set; }
        public long ItemsId { get; set; }
        public decimal Quantity { get; set; }

        public Item Item { get; set; }
    }
}
