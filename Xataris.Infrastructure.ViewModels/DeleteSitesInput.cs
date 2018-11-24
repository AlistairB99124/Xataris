using System;
using System.Collections.Generic;
using System.Text;

namespace Xataris.Infrastructure.ViewModels
{
    public class DeleteSitesInput : UserIdInput
    {
        public string[] Ids { get; set; }
    }
}
