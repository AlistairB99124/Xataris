using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Xataris.Infrastructure.ViewModels
{
    public class Credential : UserIdInput
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string UserName { get; set; }
        public bool RememberMe { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
