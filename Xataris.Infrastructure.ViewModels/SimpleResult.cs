namespace Xataris.Infrastructure.ViewModels
{
    public class SimpleResult : UserIdInput
    {
        public dynamic Id { get; set; }
        public string ErrorMessage { get; set; }
        public bool IsSuccess { get; set; }
    }
}
