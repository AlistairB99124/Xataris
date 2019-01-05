using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xataris.Application.Interfaces;
using Xataris.DBService;
using Xataris.Infrastructure.ViewModels;
using Microsoft.EntityFrameworkCore;
using Xataris.Infrastructure.ApplicationVariables;
using Xataris.Domain.Pocos;
using Xataris.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text.Encodings.Web;

namespace Xataris.Application.Implimentations
{
    public class Users : IUsers
    {
        private XatarisContext _context;
        private IUserDomain _userDomain;
        private readonly IEmailSender emailSender;
        private readonly IUserSettings _userSettings;
        private IProcedureService _procedureService;

        public Users(XatarisContext context, IUserDomain userDomain, IEmailSender emailSender, IUserSettings userSettings, IProcedureService procedureService)
        {
            _context = context;
            _userDomain = userDomain;
            this.emailSender = emailSender;
            _userSettings = userSettings;
            _procedureService = procedureService;
        }

        public async Task<SimpleResult> GetUserByEmail(UserEmailInput input)
        {
            try
            {
                var result = await _context.Users.FindAsync(input.Email);
                return new SimpleResult
                {
                    IsSuccess = result != null
                };
            }
            catch (Exception ex)
            {
                return new SimpleResult
                {
                    IsSuccess = false,
                    ErrorMessage = ex.Message
                };
            }
        }

        public async Task<UsersManagementCounts> GetUserManagementCounts()
        {
            try
            {
                var countLockedOut = await _context.Users.Where(x => x.LockoutEnd < DateTime.UtcNow).CountAsync();
                var countNeverLoggedIn = await _context.Users.Where(x => x.LastLoggedIn < DateTime.Now.AddMonths(-1)).CountAsync();
                var countLoggedInLastMonth = await _context.Users.Where(x => x.LastLoggedIn > DateTime.Now.AddMonths(-1)).CountAsync();
                var loggedIn = await _context.Users.Where(x => x.LastLoggedIn > DateTime.Now.AddHours(-1)).CountAsync();
                return new UsersManagementCounts
                {
                    LockedOutCount = countLockedOut,
                    LoggedInCount = loggedIn,
                    LoggedLastMonthCount = countLoggedInLastMonth,
                    NeverLoggedCount = countNeverLoggedIn
                };
            }
            catch
            {
                return null;
            }
        }

        public async Task<GroupViewModel[]> GetGroups()
        {
            try
            {
                var result = await _context.UserGroups.Where(x => x.Deleted == false).ToArrayAsync();

                return result.Select(x => new GroupViewModel
                {
                    Id = x.Id,
                    AccessLevel = x.AccessLevel.ToString(),
                    Description = x.Description,
                    Modules = x.Modules,
                    Title = x.Title,
                    Deleted = x.Deleted
                }).ToArray();
            }
            catch
            {
                return null;
            }
        }

        public async Task<DropdownModel[]> GetAvailableModules()
        {
            try
            {
                var result = await _context.Modules.ToArrayAsync();
                return result.Select(x => new DropdownModel
                {
                    Text = x.Name,
                    Value = x.Id,
                    Selected = false
                }).ToArray();
            }
            catch
            {
                return null;
            }
        }

        public async Task<GroupViewModel> GetGroup(long id)
        {
            try
            {
                var result = await _context.UserGroups.FindAsync(id);
                return new GroupViewModel
                {
                    AccessLevel = result.AccessLevel.ToString(),
                    Description = result.Description,
                    Id = result.Id,
                    Modules = JsonConvert.SerializeObject(result.Modules),
                    Title = result.Title
                };
            }
            catch
            {
                return null;
            }
        }

        public async Task<SimpleResult> SaveGroup(SaveGroupInput input)
        {
            try
            {
                if (input.Id != null)
                {
                    var existingGroup = await _context.UserGroups.FindAsync(input.Id);
                    await _userDomain.UpdateGroup(existingGroup);
                    return new SimpleResult
                    {
                        IsSuccess = true
                    };
                }
                else
                {
                    var modules = new List<ModulePoco>();
                    foreach (var x in input.Modules)
                    {
                        var mod = await _context.Modules.FindAsync(x.Value);
                        modules.Add(mod);
                    }
                    var group = new UserGroupPoco
                    {
                        AccessLevel = (AccessLevel)input.Access.Value,
                        Title = input.Title,
                        Description = input.Description,
                        Modules = JsonConvert.SerializeObject(modules, new JsonSerializerSettings
                        {
                            ContractResolver = new CamelCasePropertyNamesContractResolver()
                        })
                    };
                    await _userDomain.AddGroup(group);
                    return new SimpleResult
                    {
                        IsSuccess = true
                    };
                }
            }
            catch (Exception ex)
            {
                return new SimpleResult
                {
                    IsSuccess = false,
                    ErrorMessage = JsonConvert.SerializeObject(ex)
                };
            }
        }

        public async Task<SimpleResult> DeleteGroups(GroupInput input)
        {
            try
            {
                await _userDomain.DeleteGroup(input.GroupsIds);
                return new SimpleResult
                {
                    IsSuccess = true
                };
            }
            catch (Exception ex)
            {
                return new SimpleResult
                {
                    IsSuccess = false,
                    ErrorMessage = JsonConvert.SerializeObject(ex)
                };
            }
        }

        public async Task<SimpleResult> SaveUser(UserViewModel input, UserManager<UserPoco> userManager)
        {
            try
            {
                SimpleResult result;
                if (input.Id != null)
                {
                    var poco = await _context.Users.FindAsync(input.Id);
                    poco.Email = input.Email;
                    poco.NormalizedEmail = input.Email.ToUpper();
                    poco.NormalizedUserName = input.Email.ToUpper();
                    poco.UserName = input.Email;
                    poco.FirstName = input.FirstName;
                    poco.GroupId = input.GroupId;
                    poco.LastName = input.LastName;
                    poco.PtmEnabled = input.PtmEnabled;
                    poco.EmploymentStartDate = input.EmploymentStartDate;
                    poco.EmploymentEndDate = input.EmploymentEndDate;
                    var identityResult = await userManager.UpdateAsync(poco);
                    result = new SimpleResult
                    {
                        IsSuccess = identityResult.Succeeded
                    };
                }
                else
                {
                    if (input.Password == string.Empty || input.Password == null)
                    {
                        input.Password = "thi5isabullshitpassword";
                    }
                    var poco = new UserPoco
                    {
                        Email = input.Email,
                        LastName = input.LastName,
                        FirstName = input.FirstName,
                        UserName = input.Email,
                        DateRegistered = DateTime.UtcNow,
                        GroupId = input.GroupId,
                        PtmEnabled = input.PtmEnabled,
                        EmploymentStartDate = input.EmploymentStartDate,
                        EmploymentEndDate = input.EmploymentEndDate
                    };
                    result = await _userDomain.SaveUser(poco, userManager, input.Password);
                    var token = await userManager.GeneratePasswordResetTokenAsync(poco);
                    StringBuilder sb = new StringBuilder();
                    foreach (char x in token)
                    {
                        if (x == '/')
                        {
                            sb.Append('@');
                        } else
                        {
                            sb.Append(x);
                        }
                    }
                    var postUrl = "https://www.xataris.co.uk/#/account/login/";
                    var body = "<p>Welcome to Xataris " + poco.FirstName + " " + poco.LastName + ". Please follow the following link to set your password.</p><a href='" + HtmlEncoder.Default.Encode(postUrl + sb.ToString()) + "'>Set Password</a>";
                    await emailSender.SendEmailAsync(input.Email, "Welcome to Xataris", body, true);
                }
                return new SimpleResult
                {
                    IsSuccess = result.IsSuccess,
                    ErrorMessage = result.ErrorMessage
                };
            }
            catch (Exception ex)
            {
                return new SimpleResult
                {
                    IsSuccess = false,
                    ErrorMessage = JsonConvert.SerializeObject(ex)
                };
            }
        }

        public async Task<UserPoco[]> GetFilteredUsers(UserFilterInput input)
        {
            try
            {
                var result = new List<UserPoco>();
                var beginningOfTime = new DateTime();
                switch (input.Filter)
                {
                    case UserFilter.LockedOut:
                        result = await _context.Users.Where(x => x.LockoutEnd > DateTimeOffset.UtcNow).ToListAsync();
                        break;
                    case UserFilter.NeverLoggedIn:
                        result = await _context.Users.Where(x => x.LastLoggedIn == beginningOfTime).ToListAsync();
                        break;
                    case UserFilter.LoggedInLastMonth:
                        result = await _context.Users.Where(x => x.LastLoggedIn == beginningOfTime).ToListAsync();
                        break;
                    case UserFilter.LoggedIn:
                        result = await _context.Users.Where(x => x.LastLoggedIn < (DateTime.Today.AddMonths(-1))).ToListAsync();
                        break;
                    default:
                        result = null;
                        break;
                }
                return result.ToArray();
            }
            catch
            {
                return null;
            }
        }

        public async Task<DropdownModel[]> GetWarehouses()
        {
            try
            {
                var result = await _context.Warehouses.ToListAsync();
                return result.Select(x => new DropdownModel
                {
                    Value = x.Id,
                    Text = x.Name,
                    Selected = false
                }).ToArray();
            }
            catch
            {
                return null;
            }
        }

        public async Task<UserGridDetail[]> GetUserByStatus(FilterUsersInput input)
        {
            try
            {
                List<UserPoco> result = new List<UserPoco>();
                switch (input.Filter)
                {
                    case UserFilter.LockedOut:
                        result = await _context.Users.Where(x => x.LockoutEnd < DateTime.UtcNow).ToListAsync();
                        break;
                    case UserFilter.LoggedIn:
                        result = await _context.Users.Where(x => x.LastLoggedIn > DateTime.Now.AddHours(-1)).ToListAsync();
                        break;
                    case UserFilter.LoggedInLastMonth:
                        result = await _context.Users.Where(x => x.LastLoggedIn > DateTime.Now.AddMonths(-1)).ToListAsync();
                        break;
                    case UserFilter.NeverLoggedIn:
                        result = await _context.Users.Where(x => x.LastLoggedIn < DateTime.Now.AddMonths(-1)).ToListAsync();
                        break;
                }
                return result.Select(x => new UserGridDetail
                {
                    DateRegistered = x.DateRegistered.ToLongDateString(),
                    Email = x.Email,
                    FirstName = x.FirstName,
                    Group = _context.UserGroups.Where(s => s.Id == x.GroupId).FirstOrDefault().Title,
                    Id = x.Id,
                    LastName = x.LastName
                }).ToArray();
            }
            catch
            {
                return new List<UserGridDetail>().ToArray();
            }
        }

        public async Task<UserPoco> GetUser(UserEmailInput input)
        {
            try
            {
                return await _context.Users.Where(x => x.Email == input.Email).FirstOrDefaultAsync();
            }
            catch
            {
                return null;
            }
        }

        public async Task UpdateUser(string userId)
        {
            var user = await _context.Users.FindAsync(userId);
            user.LastLoggedIn = DateTime.Now;
            _context.Entry(user).State = EntityState.Modified;
            var apiRequests = await _context.LookupValues.Where(x => x.LookupValuesId == (long)LookupValueEnum.ApiRequests).LastOrDefaultAsync();
            if(apiRequests == null)
            {
                await _context.LookupValues.AddAsync(new LookupValue
                {
                    LookupValuesId = (long)LookupValueEnum.ApiRequests,
                    DataType = DataType.Integer,
                    DataValue = "1",
                    Updated = DateTime.Now
                });
            } else
            {
                if(apiRequests.Updated.Date == DateTime.Today)
                {
                    var lastApi = Convert.ToInt32(apiRequests.DataValue);
                    lastApi = lastApi + 1;
                    var newLookup = new LookupValue
                    {
                        DataType = DataType.Integer,
                        DataValue = lastApi.ToString(),
                        LookupValuesId = (long)LookupValueEnum.ApiRequests,
                        Updated = DateTime.Now
                    };
                    await _context.LookupValues.AddAsync(newLookup);
                } else
                {
                    await _context.LookupValues.AddAsync(new LookupValue
                    {
                        LookupValuesId = (long)LookupValueEnum.ApiRequests,
                        DataType = DataType.Integer,
                        DataValue = "1",
                        Updated = DateTime.Now
                    });
                }
            }
            await _context.SaveChangesAsync();
        }

        public async Task<SimpleResult> DeleteUser(UserEmailInput input, UserManager<UserPoco> userManager)
        {
            try
            {
                var user = await _context.Users.Where(x => x.Email == input.Email).FirstOrDefaultAsync();
                return await _userDomain.DeleteUser(user, userManager);
            }
            catch
            {
                return new SimpleResult
                {
                    IsSuccess = false
                };
            }
        }

        public async Task<LoginSimpleResult> Login(LoginInput input, SignInManager<UserPoco> signInManager, UserManager<UserPoco> userManager)
        {
            try
            {
                var user = await userManager.FindByEmailAsync(input.Email);
                LoginSimpleResult result;
                if (user != null)
                {
                    var resultSign = await signInManager.PasswordSignInAsync(user.Email, input.Password, input.RememberMe, false);
                    if (resultSign.Succeeded)
                    {
                        _userSettings.LocalJwt = this.CreateJwtPacket(user);
                        var moduleResult = await _procedureService.CallProcedureAsync<GroupModuleViewModel>("dbo.ReadGroups", new { GroupsId = user.GroupId });
                        _userSettings.Modules = JsonConvert.SerializeObject(moduleResult);
                        result = new LoginSimpleResult
                        {
                            Id = user.Id,
                            IsSuccess = resultSign.Succeeded,
                            Name = user.FirstName + " " + user.LastName
                        };
                    }
                    else
                    {
                        result = new LoginSimpleResult
                        {
                            Id = user.Id,
                            IsSuccess = resultSign.Succeeded,
                            ErrorMessage = "ACCOUNT.LOGIN.WRONGPASSWORD"
                        };
                    }
                }
                else
                {
                    result = new LoginSimpleResult
                    {
                        Id = null,
                        IsSuccess = false,
                        ErrorMessage = "ACCOUNT.LOGIN.EMAILDONTEXIST"
                    };
                }
                this._userSettings.UsersId = result.Id;
                return result;
            }
            catch
            {
                var result = new LoginSimpleResult
                {
                    Id = null,
                    IsSuccess = false,
                    ErrorMessage = "ACCOUNT.LOGIN.APIERROR"
                };
                return result;
            }
        }

        private JwtPacket CreateJwtPacket(UserPoco user)
        {
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is the secret phrase"));
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            var claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id)
            };

            var jwt = new JwtSecurityToken(claims: claims, signingCredentials: signingCredentials);
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return new JwtPacket()
            {
                Name = user.FirstName + " " + user.LastName,
                Token = encodedJwt
            };
        }
    }
}
