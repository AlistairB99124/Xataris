using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Xataris.Application.Interfaces;
using Xataris.DBService;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Site")]
    [Authorize]
    public class SiteController : BaseController
    {
        private readonly ISite _site;
        private readonly IUserSettings _userSettings;

        public SiteController(ISite site, IUserSettings userSettings, XatarisContext xatarisContext) : base(xatarisContext)
        {
            _site = site;
            _userSettings = userSettings;
        }

        [HttpPost("AddSite")]
        public async Task<JsonResult> AddSite([FromBody] AddSiteViewModel input)
        {
            var result = await _site.AddSite(input);
            return await GenerateResult(result, _userSettings);
        }

        [HttpPost("GetSites")]
        public async Task<JsonResult> GetSites([FromBody] UserIdInput input)
        {
            var result = await _site.GetSites();
            return await GenerateResult(result, _userSettings);
        }

        [HttpPost("GetSite")]
        public async Task<JsonResult> GetSite([FromBody] GetSiteInput input)
        {
            var result = await _site.GetSite(input);
            return await GenerateResult(result, _userSettings);
        }

        [HttpPost("GetSiteNames")]
        public async Task<JsonResult> GetSiteNames([FromBody] UserIdInput input)
        {
            var result = await _site.GetSiteNames();
            return await GenerateResult(result, _userSettings);
        }

        [HttpPost("DeleteSites")]
        public async Task<JsonResult> DeleteSites([FromBody] DeleteSitesInput input)
        {
            var result = await _site.DeleteSites(input);
            return await GenerateResult(result, _userSettings);
        }


        [HttpPost("DeleteSite")]
        public async Task<JsonResult> DeleteSite([FromBody] GetSiteInput input)
        {
            var result = await _site.DeleteSite(input);
            return await GenerateResult(result, _userSettings);
        }
    }
}
