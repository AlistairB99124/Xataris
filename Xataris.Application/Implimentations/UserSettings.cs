using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Xataris.Application.Interfaces;
using Xataris.DBService;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.Application.Implimentations
{
    public class UserSettings : IUserSettings
    {
        private readonly XatarisContext _context;
        public UserSettings(XatarisContext context)
        {
            _context = context;
        }

        public JwtPacket LocalJwt { get; set; }
        public string UsersId { get; set; }
        public long ClientsId { get; set; }
        public DateTime LastLoggedIn { get; set; }
        public int CountLoggedIn { get; set; }

        public Task<object> GetUserModules()
        {
            throw new NotImplementedException();
        }

        public async Task UpdateLastLogged()
        {
            var user = await this._context.Users.FindAsync(this.UsersId);
            user.LastLoggedIn = DateTime.Now;
            await _context.SaveChangesAsync();
            this.CountLoggedIn = await _context.Users.Where(x => x.LastLoggedIn > DateTime.Now.AddHours(-1)).CountAsync();
        }
    }
}
