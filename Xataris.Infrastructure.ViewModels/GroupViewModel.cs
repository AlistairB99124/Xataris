namespace Xataris.Infrastructure.ViewModels
{
    public class GroupViewModel : UserIdInput
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Modules { get; set; }
        public string AccessLevel { get; set; }
        public bool Deleted { get; set; }
    }
}
