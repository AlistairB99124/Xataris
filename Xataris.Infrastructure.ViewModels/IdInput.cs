using System;
using System.Collections.Generic;
using System.Text;

namespace Xataris.Infrastructure.ViewModels
{
    public class IdInput : UserIdInput
    {
        public long Id { get; set; }
    }

    public class WarehouseInput : IdInput
    {
        public string Name { get; set; }
    }
}
