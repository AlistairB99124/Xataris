namespace Xataris.Infrastructure.ViewModels
{
    public class TimesheetCodeInput : UserIdInput
    {
        public string Code { get; set; }
        public MaterialItemViewModel[] Materials { get; set; }
    }
}
