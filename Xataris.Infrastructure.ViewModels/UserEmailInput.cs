namespace Xataris.Infrastructure.ViewModels
{
    public class UserEmailInput : UserIdInput
    {
        public string Email { get; set; }
    }

    public class ResetInput : UserEmailInput
    {
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
