using System;
using System.Collections.Generic;
using Xataris.Infrastructure.ApplicationVariables;

namespace Xataris.Domain.Pocos
{
    public class TimeSheetPoco : TrackedEntity
    {
        public string Code { get; set; }
        public DateTime DateCreated { get; set; }
        public string SpecificLocation { get; set; }
        public string DetailedPoint { get; set; }
        public Status SheetStatus { get; set; }
        public string Description { get; set; }
        public TimeSpan OperatorTime { get; set; }
        public TimeSpan AssistantTime { get; set; }
        public bool OriginalQuote { get; set; }
        public string QuoteNo { get; set; }
        public string SINumber { get; set; }
        public string UsersId { get; set; }
        public long SiteId { get; set; }
        public UserPoco User { get; set; }
        public SitePoco Site { get; set; }
        public List<MaterialItemPoco> Materials { get; set; }
        public List<NonMaterialItemPoco> NonMaterials { get; set; }
    }
}

