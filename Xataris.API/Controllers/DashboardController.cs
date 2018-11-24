using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Xataris.Application.Interfaces;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Dashboard")]
    public class DashboardController : BaseController
    {
        private readonly IDashboard dashboard;
        private readonly IUsers users;
        public DashboardController(IDashboard dashboard, IUsers users)
        {
            this.dashboard = dashboard;
            this.users = users;
        }
        [HttpPost("GetInventoryByWarehouse")]
        public async Task<JsonResult> GetInventoryByWarehouse([FromBody] UserIdInput input)
        {
            var result = await dashboard.GetInventoryByWarehouse();
            return await GenerateResult(result, users, input.GUID);
        }
        [HttpPost("GetInventoryByWarehouseId")]
        public async Task<JsonResult> GetInventoryByWarehouseId([FromBody] WarehouseInput input)
        {
            var result = await dashboard.GetInventoryByWarehouseId(input);
            return await GenerateResult(result, users, input.GUID);
        }
    }
}