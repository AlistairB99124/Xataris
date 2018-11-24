using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using Xataris.Domain.Pocos;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.Domain.Interfaces
{
    public interface IUserDomain
    {
        Task<UserGroupPoco> AddGroup(UserGroupPoco input);
        Task<SimpleResult> EditGroup(UserGroupPoco input);
        Task<SimpleResult> SaveUser(UserPoco input, UserManager<UserPoco> userManager);
        Task<SimpleResult> SaveUser(UserPoco input, UserManager<UserPoco> userManager, string password);
        Task DeleteGroup(GroupIdInput[] input);
        Task UpdateGroup(UserGroupPoco input);
        Task<SimpleResult> UpdateUserDetail(UserPoco input);
        Task<SimpleResult> DeleteUser(UserPoco user, UserManager<UserPoco> userManager);
    }
}
