using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Xataris.Application.Interfaces;
using Xataris.Domain.Pocos;
using Xataris.Infrastructure.ViewModels;
using System.Web;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Xataris.DBService;
using System.Text.Encodings.Web;

namespace Xataris.API.Controllers
{
    [Produces("application/json")]
    [Route("api/User")]
    public class UserController : BaseController
    {
        private readonly IUsers _user;
        private readonly IEmailSender _emailSender;
        private readonly IUserSettings _userSettings;
        private readonly UserManager<UserPoco> _userManager;
        private readonly SignInManager<UserPoco> _signInManager;

        public UserController(IUsers user, IEmailSender emailSender, UserManager<UserPoco> userManager, SignInManager<UserPoco> signInManager, IUserSettings userSettings, XatarisContext xatarisContext) : base(xatarisContext)
        {
            _user = user;
            _emailSender = emailSender;
            _userManager = userManager;
            _signInManager = signInManager;
            _userSettings = userSettings;
        }

        [HttpPost("GetToolbarDetails")]
        public async Task<JsonResult> GetToolbarDetails([FromBody] UserIdInput input)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(input.GUID);
                var result = new UserViewModel
                {
                    GroupId = user.GroupId,
                    Email = user.Email,
                    DateRegistered = user.DateRegistered,
                    Id = user.Id,
                    EmailConfirmed = user.EmailConfirmed,
                    FirstName = user.FirstName,
                    LastLoggedIn = user.LastLoggedIn,
                    LastName = user.LastName,
                    PasswordHash = user.PasswordHash,
                    PhoneNumber = user.PhoneNumber,
                    UserName = user.UserName
                };
                return await GenerateResult(result, _userSettings);
            }
            catch
            {
                return await GenerateResult(null, _userSettings);
            }
        }

        [HttpPost("GetUserManagementCounts")]
        public async Task<JsonResult> GetUserManagementCounts()
        {
            var result = await _user.GetUserManagementCounts();
            return Json(new { Data = result }, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });
        }

        [HttpPost("DeleteGroups")]
        public async Task<JsonResult> DeleteGroups([FromBody] GroupInput input)
        {
            var result = await _user.DeleteGroups(input);
            return await GenerateResult(result, _userSettings);
        }

        [HttpPost("GetGroups")]
        public async Task<JsonResult> GetGroups()
        {
            var result = await _user.GetGroups();
            return Json(new { Data = result }, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });
        }

        [HttpPost("GetAvailableModules")]
        public async Task<JsonResult> GetAvailableModules()
        {
            var result = await _user.GetAvailableModules();
            return Json(new { Data = result }, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });
        }

        [HttpPost("SaveGroup")]
        public async Task<JsonResult> SaveGroup([FromBody] SaveGroupInput input)
        {
            var result = await _user.SaveGroup(input);
            return Json(new { Data = new { IsSuccess = result.IsSuccess } }, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });
        }
        [HttpPost("SaveUser")]
        public async Task<JsonResult> SaveUser([FromBody] UserViewModel input)
        {
            var result = await _user.SaveUser(input, _userManager);
            return Json(new { Data = result }, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });
        }

        [HttpPost("GetFilteredUserList")]
        public async Task<JsonResult> GetFilteredUserList([FromBody] UserFilterInput input)
        {
            var result = await _user.GetFilteredUsers(input);
            return await GenerateResult(result, _userSettings);
        }

        [HttpPost("Login")]
        public async Task<JsonResult> Login([FromBody] LoginInput input)
        {
            var result = await _user.Login(input, _signInManager, _userManager);
            return await GenerateResult(result, _userSettings);
        }

        [HttpPost("ForgotPassword")]
        public async Task<JsonResult> ForgotPassword([FromBody] UserEmailInput input)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(input.Email);

                if (user == null)
                {
                    var invalid = new SimpleResult
                    {
                        IsSuccess = false,
                        ErrorMessage = "Email is not valid"
                    };
                    return await GenerateResult(invalid, _userSettings);
                }

                var sb = new StringBuilder();
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
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

                var url = HtmlEncoder.Default.Encode("http://www.xataris.com/#/account/login/" + sb.ToString());
                var body = "<p>Follow the following link to reset your password: </p><a href='" + url + "'>Reset Password</a>";

                var emailResult = await _emailSender.SendEmailAsync(input.Email, "Password Reset", body, true);
                return await GenerateResult(emailResult, _userSettings);

            }
            catch (Exception ex)
            {
                var result = new SimpleResult
                {
                    IsSuccess = false,
                    ErrorMessage = JsonConvert.SerializeObject(ex)
                };
                return await GenerateResult(result, _userSettings);
            }
        }

        [HttpPost("ResetPassword")]
        public async Task<JsonResult> ResetPassword([FromBody] ResetInput input)
        {
            var sb = new StringBuilder();
            foreach (char x in input.Token)
            {
                if (x == '@')
                {
                    sb.Append('/');
                } else
                {
                    sb.Append(x);
                }
            }
            var user = await _userManager.FindByEmailAsync(input.Email);
            SimpleResult result;
            if (user != null)
            {
                var reset = await _userManager.ResetPasswordAsync(user, sb.ToString(), input.Password);
                //await _userManager.RemovePasswordAsync(user);
                //await _userManager.AddPasswordAsync(user, input.Password);
                result = new SimpleResult
                {
                    IsSuccess = reset.Succeeded
                };
            }
            else
            {
                result = new SimpleResult
                {
                    IsSuccess = false,
                    ErrorMessage = "Invalid Email"
                };
            }

            return await GenerateResult(result, _userSettings);
        }

        [HttpPost("GetWarehouses")]
        public async Task<JsonResult> GetWarehouses([FromBody] UserIdInput input)
        {
            var result = await _user.GetWarehouses();
            return await GenerateResult(result, _userSettings);
        }

        [HttpPost("GetUserByStatus")]
        public async Task<JsonResult> GetUserByStatus([FromBody] FilterUsersInput input)
        {
            var result = await _user.GetUserByStatus(input);
            return await GenerateResult(result, _userSettings);
        }

        [HttpPost("GetUser")]
        public async Task<JsonResult> GetUser([FromBody] UserEmailInput input)
        {
            var result = await _user.GetUser(input);
            return await GenerateResult(result, _userSettings);
        }

        [HttpPost("DeleteUser")]
        public async Task<JsonResult> DeleteUser([FromBody] UserEmailInput input)
        {
            var result = await _user.DeleteUser(input, _userManager);
            return await GenerateResult(result, _userSettings);
        }
    }
}