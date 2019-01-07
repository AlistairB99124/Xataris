using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Xataris.Application.Interfaces;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Warehouse")]
    [Authorize]
    public class WarehouseController : BaseController
    {
        private readonly IWarehouse _warehouse;
        private readonly IUserSettings _userSettings;

        public WarehouseController(IWarehouse warehouse, IUserSettings userSettings, DBService.XatarisContext xatarisContext) : base(xatarisContext)
        {
            _warehouse = warehouse;
            _userSettings = userSettings;
        }

        [HttpPost("AddWarehouse")]
        public async Task<JsonResult> AddWarehouse([FromBody]AddWarehouseInput input)
        {
            var result = await _warehouse.AddWarehouse(input);
            return await GenerateResult(result, _userSettings);
        }

        [HttpPost("GetWarehouses")]
        public async Task<JsonResult> GetWarehouses([FromBody] UserIdInput input)
        {
            var result = await _warehouse.GetWarehouses();
            return await GenerateResult(result, _userSettings);
        }

        [HttpPost("DeleteWarehouse")]
        public async Task<JsonResult> DeleteWarehouse([FromBody] WarehousesIdInput input)
        {
            var result = await _warehouse.DeleteWarehouse(input);
            return await GenerateResult(result, _userSettings);
        }
    }
}