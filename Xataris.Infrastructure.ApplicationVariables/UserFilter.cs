using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Xataris.Infrastructure.ApplicationVariables
{
    public enum UserFilter
    {
        LockedOut = 0,
        NeverLoggedIn = 1,
        LoggedInLastMonth = 2,
        LoggedIn = 3
    }
}
