using System.Collections.Generic;

namespace Xataris.Domain.Pocos
{
    public class Product
    {
        public long ProductsId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public List<PredefinedItem> PredefinedItems { get; set; }
        public List<QuoteProduct> QuoteProducts { get; set; }
    }
}
