using System.Threading.Tasks;
using Xataris.DBService;
using Xataris.Domain.Interfaces;
using Xataris.Domain.Pocos;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.Domain.Implimentations
{
    public class SiteDomain:ISiteDomain
    {
        private XatarisContext _context;

        public SiteDomain(XatarisContext context)
        {
            _context = context;
        }

        public async Task<SimpleResult> AddSite(SitePoco input)
        {
            var result = await _context.Sites.AddAsync(input);
            await _context.SaveChangesAsync();
            return new SimpleResult
            {
                IsSuccess = true,
                Id = input.Id
            };
        }

        public async Task<bool> DeleteSite(long siteId)
        {
            var site = await _context.Sites.FindAsync(siteId);
            _context.Entry(site).State = Microsoft.EntityFrameworkCore.EntityState.Deleted;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
