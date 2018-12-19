using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xataris.Domain.Pocos;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.Application.Interfaces
{
    public interface IUsers
    {
        Task<SimpleResult> GetUserByEmail(UserEmailInput input);
        Task<UsersManagementCounts> GetUserManagementCounts();
        Task<List<UserViewModel>> GetUsersWithFilter(FilterUsersInput input);
        Task<UserViewModel> GetUserByGUID(UserIdInput input);
        Task<GroupViewModel[]> GetGroups();
        Task<DropdownModel[]> GetAvailableModules();
        Task<GroupViewModel> GetGroup(long id);
        Task<UserGroupPoco> GetTheGroup(long id);
        Task<SimpleResult> SaveGroup(SaveGroupInput input);
        Task<SimpleResult> SaveUser(UserViewModel input, UserManager<UserPoco> userManager);
        Task<UserPoco[]> GetFilteredUsers(UserFilterInput input);
        Task<ModulePoco[]> GetModules(long groupId);
        Task<SimpleResult> DeleteGroups(GroupInput input);
        Task<AccessResult> GetUserPermissions(UsersIdInput input);
        Task<SimpleResult> ValidateById(UserIdInput input, UserManager<UserPoco> userManager);
        Task<DropdownModel[]> GetWarehouses();
        Task<UserGridDetail[]> GetUserByStatus(FilterUsersInput input);
        Task<UserPoco> GetUser(UserEmailInput input);
        Task UpdateUser(string userId);
        Task<SimpleResult> DeleteUser(UserEmailInput input, UserManager<UserPoco> userManager);
        Task<LoginSimpleResult> Login(LoginInput input, SignInManager<UserPoco> signInManager, UserManager<UserPoco> userManager);
    }
}
