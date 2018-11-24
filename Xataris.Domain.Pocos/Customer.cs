using System.Collections.Generic;

namespace Xataris.Domain.Pocos
{
    public class Customer
    {
        public long CustomersId { get; set; }
        public string Company { get; set; }
        public string Address { get; set; }
        public string Name { get; set; }

        public List<Quote> Quotes { get; set; }
    }
}
