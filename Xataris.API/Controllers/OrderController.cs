using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Xataris.Application.Interfaces;
using Xataris.Domain.Pocos;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Order")]
    public class OrderController : BaseController
    {
        private readonly IOrders _order;
        private readonly IUsers _user;

        public OrderController(IOrders orders, IUsers user)
        {
            _order = orders;
            _user = user;
        }

        [HttpPost("Add")]
        public async Task<JsonResult> Add([FromBody] OrderPoco input)
        {
            var result = await _order.Add(input);
            return await GenerateResult(result, _user, input.GUID);
        }

        [HttpPost("Edit")]
        public async Task<JsonResult> Edit([FromBody] OrderPoco input)
        {
            var result = await _order.Edit(input);
            return await GenerateResult(result, _user, input.GUID);
        }

        [HttpPost("Delete")]
        public async Task<JsonResult> Delete([FromBody] GetOrderInput input)
        {
            var result = await _order.Delete(input.OrdersId);
            return await GenerateResult(result, _user, input.GUID);
        }

        [HttpPost("Get")]
        public async Task<JsonResult> Get([FromBody] GetOrderInput input)
        {
            var result = await _order.Get(input.OrdersId);
            return await GenerateResult(result, _user, input.GUID);
        }

        [HttpPost("GetAll")]
        public async Task<JsonResult> GetAll([FromBody] UserIdInput input)
        {
            var result = await _order.GetAll();
            return await GenerateResult(result, _user, input.GUID);
        }

        [HttpPost("GetSites")]
        public async Task<JsonResult> GetSites([FromBody] UserIdInput input)
        {
            var result = await _order.GetSites();
            return await GenerateResult(result, _user, input.GUID);
        }

        [HttpPost("GetUsers")]
        public async Task<JsonResult> GetUsers([FromBody] UserIdInput input)
        {
            var result = await _order.GetUsers();
            return await GenerateResult(result, _user, input.GUID);
        }

        [HttpPost("GetMaterials")]
        public async Task<JsonResult> GetMaterials([FromBody] UserIdInput input)
        {
            var result = await _order.GetMaterials();
            return await GenerateResult(result, _user, input.GUID);
        }

        [HttpPost("GetOrderItems")]
        public async Task<JsonResult> GetOrderItems([FromBody] GetOrderInput input)
        {
            var result = await _order.GetOrderItems(input.OrdersId);
            return await GenerateResult(result, _user, input.GUID);
        }

        [HttpPost("GetOrderMaterials")]
        public async Task<JsonResult> GetOrderMaterials([FromBody] GetOrderInput input)
        {
            var result = await _order.GetOrderItems(input.OrdersId);
            return await GenerateResult(result, _user, input.GUID);
        }

        
    }
}