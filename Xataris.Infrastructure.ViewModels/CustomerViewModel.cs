using System;
using System.Collections.Generic;
using System.Text;

namespace Xataris.Infrastructure.ViewModels
{
    public class CustomerViewModel : UserIdInput
    {
        public long CustomersId { get; set; }
        public string Company { get; set; }
        public string Address { get; set; }
        public string Name { get; set; }

        public List<Domain.Pocos.Quote> Quotes { get; set; }
    }
}
