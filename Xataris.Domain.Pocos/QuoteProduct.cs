namespace Xataris.Domain.Pocos
{
    public class QuoteProduct
    {
        public long QuoteProductsId { get; set; }
        public long ProductsId { get; set; }
        public long QuotesId { get; set; }

        public Product Product { get; set; }
        public Quote Quote { get; set; }
    }
}
