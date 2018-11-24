using System;
using System.Collections.Generic;
using System.Text;

namespace Xataris.Domain.Pocos
{
    public class NonMaterialItemPoco : TrackedEntity
    {
        public string BOM_No { get; set; }
        public string Description { get; set; }
        public string Metric { get; set; }
        public long TimeSheetId { get; set; }
        public TimeSheetPoco TimeSheet { get; set; }
    }
}
