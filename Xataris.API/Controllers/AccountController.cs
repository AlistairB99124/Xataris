using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Threading.Tasks;
using Xataris.Application.Interfaces;
using Xataris.Domain.Pocos;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Account")]
    [Authorize]
    public class AccountController : BaseController
    {
        readonly UserManager<UserPoco> _userManager;
        readonly SignInManager<UserPoco> _signInManager;

        public AccountController(UserManager<UserPoco> userManager, SignInManager<UserPoco> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("ResetPassword")]
        public async Task<JsonResult> ResetPassword(string code = null)
        {
            return await Task.Run(() =>
            {
                if (code == null)
                {
                    throw new ApplicationException("A code must be supplied for password reset.");
                }
                return Json(new { Code = code });
            });
        }

        [HttpPost("Logout")]
        public async Task<JsonResult> Logout()
        {
            try
            {
                await _signInManager.SignOutAsync();
                var simpleResult = new SimpleResult
                {
                    IsSuccess = true
                };
                return Json(new { Data = simpleResult }, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });
            }
            catch (Exception ex)
            {
                var simpleResult = new SimpleResult
                {
                    IsSuccess = true,
                    ErrorMessage = ex.Message
                };
                return Json(new { Data = simpleResult }, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });
            }
        }        
    }
}