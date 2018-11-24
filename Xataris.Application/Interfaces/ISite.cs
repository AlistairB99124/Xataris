using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xataris.Domain.Pocos;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.Application.Interfaces
{
    public interface ISite
    {
        Task<SimpleResult> AddSite(AddSiteViewModel input);
        Task<SiteViewModel[]> GetSites();
        Task<SitePoco> GetSite(GetSiteInput input);
        Task<SiteViewModel[]> GetSiteNames();
        Task<SimpleResult> DeleteSite(GetSiteInput input);
        Task<SimpleResult> DeleteSites(DeleteSitesInput input);
    }
}
