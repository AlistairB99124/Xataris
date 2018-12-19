using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Xataris.Application.Interfaces;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Material")]
    [Authorize]
    public class MaterialController : BaseController
    {
        private IMaterial _material;
        private readonly IUserSettings _userSettings;

        public MaterialController(IMaterial material, IUserSettings userSettings)
        {
            _material = material;
            _userSettings = userSettings;
        }

        [HttpPost("SaveMaterial")]
        public async Task<JsonResult>SaveMaterial([FromBody] MaterialViewModel input)
        {
            var result = await _material.SaveMaterial(input);
            return await GenerateResult(result, _userSettings);
        }

        [HttpPost("SaveMaterials")]
        public async Task<JsonResult> SaveMaterials([FromBody] UploadInventoryViewModel input)
        {
            var result = await _material.SaveMaterials(input);
            return await GenerateResult(result, _userSettings);
        }

        [HttpPost("GetMaterials")]
        public async Task<JsonResult> GetMaterials([FromBody] UserIdInput input)
        {
            var result = await _material.GetMaterials();
            return await GenerateResult(result, _userSettings);
        }

        
        [HttpPost("GetInventory")]
        public async Task<JsonResult> GetInventory([FromBody] UserIdInput input)
        {
            var result = await _material.GetInventory();
            return await GenerateResult(result, _userSettings);
        }

        [HttpPost("GetUsers")]
        public async Task<JsonResult> GetUsers([FromBody] UserIdInput input)
        {
            var result = await _material.GetUsers();
            return await GenerateResult(result, _userSettings);
        }

        [HttpPost("GetInventoryByWarehouse")]
        public async Task<JsonResult> GetInventoryByWarehouse([FromBody] WarehouseIdInput input)
        {
            var result = await _material.GetInventoryByWarehouse(input);
            return await GenerateResult(result, _userSettings);
        }
    }
}