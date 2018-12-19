using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Xataris.Application.Interfaces;
using Xataris.Domain.Pocos;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Joey")]
    [Authorize]
    public class JoeyController : BaseController
    {
        private readonly IJoey _joey;
        private readonly IUserSettings _userSettings;

        public JoeyController(IJoey joey, IUserSettings userSettings)
        {
            this._joey = joey;
            _userSettings = userSettings;
        }

        [HttpPost("GetDataTabResults")]
        public async Task<JsonResult> GetDataTabResults([FromBody] UserIdInput input)
        {
            var result = await _joey.GetDataTabResults();
            return await GenerateResult(result, _userSettings);
        }

        [HttpPost("SaveCustomer")]
        public async Task<JsonResult> SaveCustomer([FromBody] CustomerInput input)
        {
            var result = await _joey.SaveCustomer(input);
            return await GenerateResult(result, _userSettings);
        }

    }
}