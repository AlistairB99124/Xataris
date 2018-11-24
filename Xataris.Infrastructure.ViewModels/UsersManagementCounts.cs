namespace Xataris.Infrastructure.ViewModels
{
    public class UsersManagementCounts : UserIdInput
    {
        public int LockedOutCount { get; set; }
        public int NeverLoggedCount { get; set; }
        public int LoggedLastMonthCount { get; set; }
        public int LoggedInCount { get; set; }
    }
}
