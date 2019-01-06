using System;
using System.Collections.Generic;
using System.Text;

namespace Xataris.Infrastructure.ViewModels
{
    public class TimesheetsViewModel
    {
        public long TimesheetId { get; set; }
        public string Code { get; set; }
        public string DateCreated { get; set; }
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
}
