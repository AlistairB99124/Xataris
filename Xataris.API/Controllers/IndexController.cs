using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Xataris.DBService;
using Xataris.Infrastructure.ApplicationVariables;

namespace Xataris.API.Controllers {
    [Produces("application/json")]
    [Route("api/Index")]
    public class IndexController : Controller {
        private readonly XatarisContext _xatarisContext;

        public IndexController(XatarisContext xatarisContext) {
            _xatarisContext = xatarisContext;
        }

        [HttpGet]
        [Route("/")]
        public async Task<ActionResult> Index() => await Task.Run(() =>
        {
            ViewBag.Version = "Xataris v1.1.0.0";
            // var days = new string["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            ViewBag.ApiRequests = _xatarisContext.LookupValues.Where(x => x.LookupValuesId == (long)LookupValueEnum.ApiRequests);
            return View();
        });
    }
}