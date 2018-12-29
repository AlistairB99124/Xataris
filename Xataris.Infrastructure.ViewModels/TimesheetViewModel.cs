using System;
using System.Collections.Generic;
using Xataris.Infrastructure.ApplicationVariables;

namespace Xataris.Infrastructure.ViewModels
{
    public class TimesheetViewModel : UserIdInput
    {
        public string Code { get; set; }
        public DateTime DateCreated { get; set; }
        public string SpecificLocation { get; set; }
        public string DetailedPoint { get; set; }
        public Status Status { get; set; }
        public string Description { get; set; }
        public int SecondaryHours { get; set; }
        public int SecondaryMins { get; set; }
        public int PrimaryHours { get; set; }
        public int PrimaryMins { get; set; }
        public bool OriginalQuote { get; set; }
        public string QuoteNumber { get; set; }
        public string SiNumber { get; set; }
        public string PrimaryTechnician { get; set; }
        public long Site { get; set; }
        public List<MaterialItemViewModel> Materials { get; set; }
    }

    public class TimesheetView
    {
        public long TimesheetId { get; set; }
        public string Code { get; set; }
        public DateTime DateCreated { get; set; }
        public string SpecificLocation { get; set; }
        public string DetailedPoint { get; set; }
        public int Status { get; set; }
        public string Description { get; set; }
        public TimeSpan AssistantTime { get; set; }
        public TimeSpan OperatorTime { get; set; }
        public string OriginalQuote { get; set; }
        public string QuoteNo { get; set; }
        public string SINumber { get; set; }
        public string Plumber { get; set; }
        public string Site { get; set; }
        public bool IsSelected { get; set; }
        public int Materials { get; set; }
    }

    public class MaterialCountModel
    {
        public int MaterialCount { get; set; }
        public int NonMaterialCount { get; set; }
    }
}
