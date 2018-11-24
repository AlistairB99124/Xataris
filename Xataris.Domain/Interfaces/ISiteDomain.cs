using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xataris.Domain.Pocos;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.Domain.Interfaces
{
    public interface ISiteDomain
    {
        Task<SimpleResult> AddSite(SitePoco input);
        Task<bool> DeleteSite(long siteId);
    }
}
