namespace Xataris.Infrastructure.ViewModels
{
    public class NonMaterialItemViewModel : UserIdInput
    {
        public long Id { get; set; }
        public string BOM_No { get; set; }
        public string Description { get; set; }
        public string Metric { get; set; }
        public long TimesheetId { get; set; }
    }
}
