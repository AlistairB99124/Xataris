using System;
using System.Collections.Generic;
using System.Text;

namespace Xataris.Domain.Pocos
{
    public class LocationPoco : TrackedEntity
    {
        public float Lat { get; set; }
        public float Lng { get; set; }
        public List<SitePoco> Sites { get; set; }
    }
}
