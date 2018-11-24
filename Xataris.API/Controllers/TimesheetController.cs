using System;
using System.Collections.Generic;
using System.Reflection.Metadata;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Xataris.Application.Interfaces;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Timesheet")]
    public class TimesheetController : BaseController
    {
        private ITimesheet _timesheet;
        private readonly IUsers _user;
        public TimesheetController(ITimesheet timesheet, IUsers user)
        {
            _timesheet = timesheet;
            _user = user;
        }
        [HttpPost("AddTimesheet")]
        public async Task<JsonResult> AddTimesheet([FromBody] TimesheetViewModel input)
        {
            var result = await _timesheet.AddTimesheet(input);
            return await GenerateResult(result, _user, input.GUID);
        }

        [HttpPost("GetUsers")]
        public async Task<JsonResult> GetUsers([FromBody] UserIdInput input)
        {
            var result = await _timesheet.GetUsers();
            return await GenerateResult(result, _user, input.GUID);
        }

        [HttpPost("GetInventory")]
        public async Task<JsonResult> GetInventory([FromBody] UserIdInput input)
        {
            try
            {
                var result = await _timesheet.GetInventory();
                return await GenerateResult(result, _user, input.GUID);
            }
            catch (Exception ex)
            {
                return await GenerateResult(ex, _user, input.GUID);
            }
        }

        [HttpPost("GetMaterials")]
        public async Task<JsonResult> GetMaterials([FromBody] MaterialIdInput input)
        {
            var result = await _timesheet.GetMaterials(input);
            return await GenerateResult(result, _user, input.GUID);
        }

        [HttpPost("GetMaterial")]
        public async Task<JsonResult> GetMaterial([FromBody] InventoryIdInput input)
        {
            var result = await _timesheet.GetMaterial(input);
            return await GenerateResult(result, _user, input.GUID);
        }

        [HttpPost("UploadTimesheet")]
        public async Task<JsonResult> UploadTimesheet([FromBody] ByteInput input)
        {
            var result = await _timesheet.UploadTimesheet(input);
            return await GenerateResult(result, _user, input.GUID);
        }

        [HttpPost("GetTimesheets")]
        public async Task<JsonResult> GetTimesheets([FromBody] UserIdInput input)
        {
            var result = await _timesheet.GetTimesheets(input);
            return await GenerateResult(result, _user, input.GUID);
        }

        [HttpPost("DeleteTimesheet")]
        public async Task<JsonResult> DeleteTimesheet([FromBody] TimesheetIdInput input)
        {
            var result = await _timesheet.DeleteTimesheet(input);
            return await GenerateResult(result, _user, input.GUID);
        }


        [HttpPost("GetTimesheetMaterials")]
        public async Task<JsonResult> GetTimesheetMaterials([FromBody] TimesheetIdInput input)
        {
            var result = await _timesheet.GetTimesheetMaterials(input);
            return await GenerateResult(result, _user, input.GUID);
        }

        [HttpPost("SaveMaterialItems")]
        public async Task<JsonResult> SaveMaterialItems([FromBody] TimesheetCodeInput input)
        {
            var result = await _timesheet.SaveMaterialItems(input);
            return await GenerateResult(result, _user, input.GUID);
        }
    }
}