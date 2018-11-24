namespace Xataris.Infrastructure.ViewModels
{
    public class AccessResult : UserIdInput
    {
        public int Permission { get; set; }
        public ModuleViewModel[] Modules { get; set; }
    }

    public class ModuleViewModel : UserIdInput
    {
        public long Id { get; set; }
        public string Name { get; set; }
    }

    public class UsersIdInput : UserIdInput
    {
        public string UserId { get; set; }
    }
}
