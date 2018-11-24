using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System.Dynamic;
using System.Reflection;
using Xataris.Application.Interfaces;
using Xataris.Domain.Pocos;

namespace Xataris.API.Controllers
{
    [Produces("application/json")]
    public class BaseController : Controller
    {
        protected async Task<JsonResult> GenerateResult(object originalResult, IUsers users, string userId)
        {
            var cliam = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId)
            };
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is the secret phrase"));
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            var jwt = new JwtSecurityToken(signingCredentials: signingCredentials, claims: cliam);
            dynamic result = new ExpandoObject();
            result.data = originalResult;
            result.localJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            result.version = Assembly.GetAssembly(GetType()).GetName().Version.ToString();
            try
            {
                await users.UpdateUser(userId);
                return Json(result);
            }
            catch (Exception ex)
            {
                await users.UpdateUser(userId);
                return Json(ex);
            }
        }

        protected async Task<JsonResult> GenerateResult(object originalResult)
        {
            return await Task.Run(() =>
            {
                var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is the secret phrase"));
                var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
                var jwt = new JwtSecurityToken(signingCredentials: signingCredentials);
                dynamic result = new ExpandoObject();
                result.data = originalResult;
                result.localJwt = jwt;
                result.version = Assembly.GetAssembly(GetType()).GetName().Version.ToString();
                result.sessionJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
                try
                {
                    return Json(result);
                }
                catch (Exception ex)
                {
                    return Json(ex);
                }
            });
        }
    }
}