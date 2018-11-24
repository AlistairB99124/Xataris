using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xataris.Application.Interfaces;
using Xataris.DBService;
using Xataris.Domain.Interfaces;
using Xataris.Domain.Pocos;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.Application.Implimentations
{
    public class Site : ISite
    {
        private XatarisContext _context;
        private ISiteDomain _domain;

        public Site(XatarisContext context, ISiteDomain domain)
        {
            _context = context;
            _domain = domain;
        }

        public async Task<SimpleResult> AddSite(AddSiteViewModel input)
        {
            try
            {
                var site = await _context.Sites.FindAsync(input.Id);
                SimpleResult result;
                var poco = new SitePoco
                {
                    Name = input.Name,
                    Latitude = input.LatLng.Lat,
                    Longitude = input.LatLng.Lng,
                    Address = input.Address,
                    Abbr = input.Abbr
                };
                if (site != null)
                {
                    site.Latitude = input.LatLng.Lat;
                    site.Longitude = input.LatLng.Lng;
                    site.Name = input.Name;
                    site.Abbr = input.Abbr;
                    site.Address = input.Address;
                    _context.Entry(site).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                    result = new SimpleResult
                    {
                        IsSuccess = true
                    };
                }
                else
                {
                    result = await _domain.AddSite(poco);
                }
                return result;
            }
            catch
            {
                return new SimpleResult
                {
                    IsSuccess = false
                };
            }

        }
        public async Task<SimpleResult> DeleteSite(GetSiteInput input)
        {
            var result = await _domain.DeleteSite(input.SiteId);
            return new SimpleResult
            {
                IsSuccess = result
            };
        }

        public async Task<SimpleResult> DeleteSites(DeleteSitesInput input)
        {
            try
            {
                foreach (var id in input.Ids)
                {
                    var siteId = Convert.ToInt64(id);
                    var site = await _context.Sites.FindAsync(siteId);
                    site.Deleted = true;
                    _context.Entry(site).State = EntityState.Modified;
                }
                await _context.SaveChangesAsync();
                return new SimpleResult
                {
                    IsSuccess = true
                };
            }
            catch
            {
                return new SimpleResult
                {
                    IsSuccess = false
                };
            }
        }

        public async Task<SitePoco> GetSite(GetSiteInput input)
        {
            try
            {
                var result = await _context.Sites.FindAsync(input.SiteId);
                return result;
            }
            catch
            {
                return null;
            }
        }

        public async Task<SiteViewModel[]> GetSiteNames()
        {
            try
            {
                var result = await _context.Sites.Where(o => o.Deleted != true).OrderBy(x => x.Name).ToArrayAsync();
                return result.Select(x => new SiteViewModel
                {
                    Id = x.Id,
                    Name = x.Name
                }).ToArray();
            }
            catch
            {
                return null;
            }
        }

        public async Task<SiteViewModel[]> GetSites()
        {
            try
            {
                return await _context.Sites.Where(o => o.Deleted != true).OrderBy(i => i.Name).Select(x => new SiteViewModel
                {
                    Abbr = x.Abbr,
                    Id = x.Id,
                    LatLng = new LatLng
                    {
                        Lat = x.Latitude,
                        Lng = x.Longitude
                    },
                    Address = x.Address,
                    Name = x.Name
                }).ToArrayAsync();
            }
            catch
            {
                return null;
            }
        }
    }
}
