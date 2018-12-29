using System;
using System.Threading.Tasks;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.Application.Interfaces
{
    public interface IUserSettings
    {
        JwtPacket LocalJwt { get; set; }
        string UsersId { get; set; }
        long ClientsId { get; set; }
        DateTime LastLoggedIn { get; set; }
        string Modules { get; set; }
        Task<object> GetUserModules();
        // Task UpdateLastLogged();
        int CountLoggedIn { get; set; }
    }
}
