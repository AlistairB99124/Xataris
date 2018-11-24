using System;

namespace Xataris.Infrastructure.ViewModels
{
    public class UserViewModel/* : UserIdInput*/
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateRegistered { get; set; }
        public string PhoneNumber { get; set; }
        public string PasswordHash { get; set; }
        public bool EmailConfirmed { get; set; }
        public string Email { get; set; }
        public string OriginalEmail { get; set; }
        public string UserName { get; set; }
        public string Id { get; set; }
        public DateTime LastLoggedIn { get; set; }
        public long GroupId { get; set; }
        public GroupViewModel Group { get; set; }
        public string Password { get; set; }
        public long[] WarehousesIds { get; set; }
        public bool PtmEnabled { get; set; }
        public DateTime EmploymentStartDate { get; set; }
        public DateTime EmploymentEndDate { get; set; }
    }
}
