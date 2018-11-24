namespace Xataris.Domain.Pocos
{
    public class QuoteItem
    {
        public long QuoteItemsId { get; set; }
        public long QuotesId { get; set; }
        public long ItemsId { get; set; }

        public Quote Quote { get; set; }
        public Item Item { get; set; }
    }
}
