using Xataris.Infrastructure.ApplicationVariables;

namespace Xataris.Infrastructure.ViewModels
{
    public class UserFilterInput : UserIdInput
    {
        public UserFilter Filter { get; set; }
    }
}
