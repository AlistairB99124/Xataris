using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Xataris.Application.Interfaces;
using Xataris.DBService;
using Xataris.Domain.Pocos;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Order")]
    [Authorize]
    public class OrderController : BaseController
    {
        private readonly IOrders _order;
        private readonly IUserSettings _userSettings;

        public OrderController(IOrders orders, IUserSettings userSettings, XatarisContext xatarisContext) : base(xatarisContext)
        {
            _order = orders;
            _userSettings = userSettings;
        }

        [HttpPost("Add")]
        public async Task<JsonResult> Add([FromBody] OrderPoco input)
        {
            var result = await _order.Add(input);
            return await GenerateResult(result, _userSettings);
        }

        [HttpPost("Edit")]
        public async Task<JsonResult> Edit([FromBody] OrderPoco input)
        {
            var result = await _order.Edit(input);
            return await GenerateResult(result, _userSettings);
        }

        [HttpPost("Delete")]
        public async Task<JsonResult> Delete([FromBody] GetOrderInput input)
        {
            var result = await _order.Delete(input.OrdersId);
            return await GenerateResult(result, _userSettings);
        }

        [HttpPost("Get")]
        public async Task<JsonResult> Get([FromBody] GetOrderInput input)
        {
            var result = await _order.Get(input.OrdersId);
            return await GenerateResult(result, _userSettings);
        }

        [HttpPost("GetAll")]
        public async Task<JsonResult> GetAll()
        {
            var result = await _order.GetAll();
            return await GenerateResult(result, _userSettings);
        }

        [HttpPost("GetSites")]
        public async Task<JsonResult> GetSites()
        {
            var result = await _order.GetSites();
            return await GenerateResult(result, _userSettings);
        }

        [HttpPost("GetUsers")]
        public async Task<JsonResult> GetUsers()
        {
            var result = await _order.GetUsers();
            return await GenerateResult(result, _userSettings);
        }

        [HttpPost("GetMaterials")]
        public async Task<JsonResult> GetMaterials()
        {
            var result = await _order.GetMaterials();
            return await GenerateResult(result, _userSettings);
        }

        [HttpPost("GetOrderItems")]
        public async Task<JsonResult> GetOrderItems([FromBody] GetOrderInput input)
        {
            var result = await _order.GetOrderItems(input.OrdersId);
            return await GenerateResult(result, _userSettings);
        }

        [HttpPost("GetOrderMaterials")]
        public async Task<JsonResult> GetOrderMaterials([FromBody] GetOrderInput input)
        {
            var result = await _order.GetOrderItems(input.OrdersId);
            return await GenerateResult(result, _userSettings);
        }

        
    }
}