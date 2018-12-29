using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Dynamic;
using System.Reflection;
using Xataris.Application.Interfaces;
using Xataris.DBService;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Xataris.API.Controllers
{
    [Produces("application/json")]
    public class BaseController : Controller
    {
        private readonly XatarisContext xatarisContext;
        public BaseController(XatarisContext xatarisContext)
        {
            this.xatarisContext = xatarisContext;
        }

        protected async Task<JsonResult> GenerateResult(object originalResult, IUserSettings userSettings)
        {
            dynamic result = new ExpandoObject();
            result.data = originalResult;
            var user = await this.xatarisContext.Users.FindAsync(userSettings.UsersId);
            user.LastLoggedIn = DateTime.Now;
            await xatarisContext.SaveChangesAsync();
            userSettings.CountLoggedIn = await xatarisContext.Users.Where(x => x.LastLoggedIn > DateTime.Now.AddHours(-1)).CountAsync();
            try
            {
                result.localJwt = userSettings.LocalJwt.Token;
                result.modules = userSettings.Modules;
                result.logout = false;
            }
            catch
            {
                result.logout = true;
            }
            result.version = Assembly.GetAssembly(GetType()).GetName().Version.ToString();
            return Json(result);
        }
    }
}