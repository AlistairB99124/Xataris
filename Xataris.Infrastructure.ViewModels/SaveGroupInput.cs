using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Xataris.Infrastructure.ViewModels
{
    public class SaveGroupInput : UserIdInput
    {
        public long? Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DropdownModel[] Modules { get; set; }
        public DropdownModel Access { get; set; }
    }
}
