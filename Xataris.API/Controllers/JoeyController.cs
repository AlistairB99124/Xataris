using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    public class JoeyController : BaseController
    {
        private readonly IJoey _joey;
        private readonly IUsers users;

        public JoeyController(IJoey joey, IUsers users)
        {
            this._joey = joey;
            this.users = users;
        }

        [HttpPost("GetDataTabResults")]
        public async Task<JsonResult> GetDataTabResults([FromBody] UserIdInput input)
        {
            var result = await _joey.GetDataTabResults();
            return await GenerateResult(result, users, input.GUID);
        }

        [HttpPost("SaveCustomer")]
        public async Task<JsonResult> SaveCustomer([FromBody] CustomerInput input)
        {
            var result = await _joey.SaveCustomer(input);
            return await GenerateResult(result, users, input.GUID);
        }

    }
}