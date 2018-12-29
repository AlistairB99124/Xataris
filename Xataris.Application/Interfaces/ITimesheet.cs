using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using Xataris.Domain.Pocos;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.Application.Interfaces
{
    public interface ITimesheet
    {
        Task<TimesheetResult> AddTimesheet(TimesheetViewModel input);
        Task<IDropdownModel<string>[]> GetUsers();
        Task<object> GetMaterials(MaterialIdInput input);
        Task<object> GetMaterial(InventoryIdInput input);
        Task<InventoryTimesheetViewModel> GetInventory();
        Task<SimpleResult> UploadTimesheet(ByteInput input);
        Task<List<TimesheetView>> GetTimesheets(UserIdInput input);
        Task<SimpleResult> DeleteTimesheet(TimesheetIdInput input);
        Task<object> GetTimesheetMaterials(TimesheetIdInput input);
        Task<SimpleResult> SaveMaterialItems(TimesheetCodeInput input);
        Task<List<GetMaterialsByTimesheetView>> GetMaterialsByTimesheet(long input);
    }
}
