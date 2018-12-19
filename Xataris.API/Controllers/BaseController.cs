using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Dynamic;
using System.Reflection;
using Xataris.Application.Interfaces;

namespace Xataris.API.Controllers
{
    [Produces("application/json")]
    public class BaseController : Controller
    {
        protected async Task<JsonResult> GenerateResult(object originalResult, IUserSettings userSettings)
        {
            return await Task.Run(() =>
            {
                dynamic result = new ExpandoObject();
                result.data = originalResult;
                userSettings.UpdateLastLogged();
                try
                {
                    result.localJwt = userSettings.LocalJwt.Token;
                    result.logout = false;
                }
                catch
                {
                    result.logout = true;
                }
                result.version = Assembly.GetAssembly(GetType()).GetName().Version.ToString();
                return Json(result);
            });
        }
    }
}