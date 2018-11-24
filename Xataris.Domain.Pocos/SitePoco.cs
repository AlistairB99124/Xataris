using System.Collections.Generic;

namespace Xataris.Domain.Pocos
{
    public class SitePoco : TrackedEntity
    {
        public string Name { get; set; }
        public string Abbr { get; set; }
        public string Address { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public List<TimeSheetPoco> TimeSheets { get; set; }
    }
}
