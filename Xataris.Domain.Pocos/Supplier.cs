using System.Collections.Generic;

namespace Xataris.Domain.Pocos
{
    public class Supplier
    {
        public long SuppliersId { get; set; }
        public string WebAddress { get; set; }
        public string Telephone { get; set; }
        public string Name { get; set; }

        public List<Item> Items { get; set; }
    }
}
