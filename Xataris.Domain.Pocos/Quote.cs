using System.Collections.Generic;

namespace Xataris.Domain.Pocos
{
    public class Quote
    {
        public long QuotesId { get; set; }
        public long CustomersId { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Discount { get; set; }
        public decimal VAT { get; set; }
        public decimal Total { get; set; }
        public string UsersId { get; set; }

        public List<QuoteProduct> QuoteProducts { get; set; }
        public List<QuoteItem> QuoteItems { get; set; }

        public UserPoco User { get; set; }
        public Customer Customer { get; set; }
    }
}
