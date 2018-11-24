using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xataris.Domain.Pocos;

namespace Xataris.Infrastructure.ViewModels
{
    public class LoginResult : UserIdInput
    {
        public bool IsSuccess { get; set; }
        public string Email { get; set; }
        public string Id { get; set; }
        public GroupViewModel Group { get; set; }
    }
}
