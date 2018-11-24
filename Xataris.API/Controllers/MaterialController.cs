using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Xataris.Application.Interfaces;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Material")]
    public class MaterialController : BaseController
    {
        private IMaterial _material;
        private readonly IUsers _users;

        public MaterialController(IMaterial material, IUsers user)
        {
            _material = material;
            _users = user;
        }

        [HttpPost("SaveMaterial")]
        public async Task<JsonResult>SaveMaterial([FromBody] MaterialViewModel input)
        {
            var result = await _material.SaveMaterial(input);
            return await GenerateResult(result, _users, input.GUID);
        }

        [HttpPost("SaveMaterials")]
        public async Task<JsonResult> SaveMaterials([FromBody] UploadInventoryViewModel input)
        {
            var result = await _material.SaveMaterials(input);
            return await GenerateResult(result, _users, input.GUID);
        }

        [HttpPost("GetMaterials")]
        public async Task<JsonResult> GetMaterials([FromBody] UserIdInput input)
        {
            var result = await _material.GetMaterials();
            return await GenerateResult(result, _users, input.GUID);
        }

        
        [HttpPost("GetInventory")]
        public async Task<JsonResult> GetInventory([FromBody] UserIdInput input)
        {
            var result = await _material.GetInventory();
            return await GenerateResult(result, _users, input.GUID);
        }

        [HttpPost("GetUsers")]
        public async Task<JsonResult> GetUsers([FromBody] UserIdInput input)
        {
            var result = await _material.GetUsers();
            return await GenerateResult(result, _users, input.GUID);
        }

        [HttpPost("GetInventoryByWarehouse")]
        public async Task<JsonResult> GetInventoryByWarehouse([FromBody] WarehouseIdInput input)
        {
            var result = await _material.GetInventoryByWarehouse(input);
            return await GenerateResult(result, _users, input.GUID);
        }
    }
}