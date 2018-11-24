using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xataris.DBService;
using Xataris.Domain.Interfaces;
using Xataris.Domain.Pocos;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.Domain.Implimentations
{
    public class UserDomain : IUserDomain
    {
        private XatarisContext _context;

        public UserDomain(XatarisContext context)
        {
            _context = context;
        }

        public async Task<UserGroupPoco> AddGroup(UserGroupPoco input)
        {
            await _context.UserGroups.AddAsync(input);
            await _context.SaveChangesAsync();
            return input;
        }

        public async Task DeleteGroup(GroupIdInput[] input)
        {
            foreach(var id in input)
            {
                var find = await _context.UserGroups.FindAsync(id.GroupsId);
                find.Deleted = true;
                _context.Entry(find).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<SimpleResult> DeleteUser(UserPoco user, UserManager<UserPoco> userManager)
        {
            var warehouse = await _context.Warehouses.Where(x => x.UserId == user.Id).FirstOrDefaultAsync();
            if(warehouse != null)
            {
                var inventory = await _context.Inventories.Where(x => x.WarehouseId == warehouse.Id).ToArrayAsync();
                _context.Inventories.RemoveRange(inventory);
                await _context.SaveChangesAsync();
                _context.Entry(warehouse).State = EntityState.Deleted;
                await _context.SaveChangesAsync();
            }
            var timesheets = await _context.TimeSheets.Where(x => x.UsersId == user.Id).ToArrayAsync();
            foreach(var timesheet in timesheets)
            {
                var non = await _context.NonMaterialItems.Where(x => x.TimeSheetId == timesheet.Id).ToArrayAsync();
                var mat = await _context.MaterialItems.Where(x => x.TimeSheetId == timesheet.Id).ToArrayAsync();
                _context.NonMaterialItems.RemoveRange(non);
                _context.MaterialItems.RemoveRange(mat);
            }
            await _context.SaveChangesAsync();
            _context.TimeSheets.RemoveRange(timesheets);
            await _context.SaveChangesAsync();
            var result = await userManager.DeleteAsync(user);
            return new SimpleResult
            {
                IsSuccess = result.Succeeded
            };
        }

        public async Task<SimpleResult> EditGroup(UserGroupPoco input)
        {
            _context.Entry(input).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return new SimpleResult
            {
                IsSuccess = true
            };
        }

        public async Task<SimpleResult> SaveUser(UserPoco input, UserManager<UserPoco> userManager)
        {
            await userManager.UpdateAsync(input);
            await _context.SaveChangesAsync();
            return new SimpleResult
            {
                IsSuccess = true
            };
        }

        public async Task<SimpleResult> SaveUser(UserPoco input, UserManager<UserPoco> userManager, string password)
        {
            var result = await userManager.CreateAsync(input, password);
            if (result.Succeeded)
            {
                await _context.SaveChangesAsync();
                return new SimpleResult
                {
                    IsSuccess = true
                };
            } else
            {
                return new SimpleResult
                {
                    IsSuccess = false,
                    ErrorMessage = JsonConvert.SerializeObject(result.Errors)
                };
            }
        }

        public async Task UpdateGroup(UserGroupPoco input)
        {
            _context.Entry(input).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<SimpleResult> UpdateUserDetail(UserPoco input)
        {
            _context.Entry(input).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return new SimpleResult
            {
                IsSuccess = true
            };
        }
    }
}
