using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Xataris.Infrastructure.ViewModels
{
    public class AddSiteViewModel : UserIdInput
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public LatLng LatLng { get; set; }
        public string Address { get; set; }
        public string Abbr { get; set; }
    }

    public class LatLng : UserIdInput
    {
        public float Lat { get; set; }
        public float Lng { get; set; }
    }
}
