using Xataris.Infrastructure.ApplicationVariables;

namespace Xataris.Infrastructure.ViewModels
{
    public class FilterUsersInput : UserIdInput
    {
        public UserFilter Filter { get; set; }
    }
}
