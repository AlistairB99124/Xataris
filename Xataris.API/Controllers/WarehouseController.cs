using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Xataris.Application.Interfaces;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Warehouse")]
    public class WarehouseController : BaseController
    {
        private readonly IWarehouse _warehouse;
        private readonly IUsers _user;

        public WarehouseController(IWarehouse warehouse, IUsers user)
        {
            _warehouse = warehouse;
            _user = user;
        }

        [HttpPost("AddWarehouse")]
        public async Task<JsonResult> AddWarehouse([FromBody]AddWarehouseInput input)
        {
            var result = await _warehouse.AddWarehouse(input);
            return await GenerateResult(result, _user, input.GUID);
        }

        [HttpPost("GetWarehouses")]
        public async Task<JsonResult> GetWarehouses([FromBody] UserIdInput input)
        {
            var result = await _warehouse.GetWarehouses();
            return await GenerateResult(result, _user, input.GUID);
        }

        [HttpPost("DeleteWarehouse")]
        public async Task<JsonResult> DeleteWarehouse([FromBody] WarehousesIdInput input)
        {
            var result = await _warehouse.DeleteWarehouse(input);
            return await GenerateResult(result, _user, input.GUID);
        }
    }
}