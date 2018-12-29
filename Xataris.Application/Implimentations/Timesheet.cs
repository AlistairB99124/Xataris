using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xataris.Application.Interfaces;
using Xataris.DBService;
using Xataris.Domain.Interfaces;
using Xataris.Domain.Pocos;
using Xataris.Infrastructure.ViewModels;
using Newtonsoft.Json;
using System.IO;
using System.Net.Mail;
using System.Net.Mime;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore.Internal;

namespace Xataris.Application.Implimentations
{
    public class Timesheet : ITimesheet
    {

        private XatarisContext _context;
        private ITimesheetDomain _timesheet;
        private readonly IEmailSender _emailSender;
        private List<char> alphabet;
        public IConfiguration _configuration { get; }
        private IProcedureService _procedureService;

        public Timesheet(XatarisContext context, ITimesheetDomain timesheet, IEmailSender emailSender, IConfiguration configuration, IProcedureService procedureService)
        {
            _context = context;
            _timesheet = timesheet;
            _emailSender = emailSender;
            alphabet = new List<char> { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };
            _configuration = configuration;
            _procedureService = procedureService;
        }

        public async Task<TimesheetResult> AddTimesheet(TimesheetViewModel input)
        {
            string code = "";
            try
            {
                TimeSheetPoco poco = new TimeSheetPoco
                {
                    AssistantTime = TimeSpan.Parse(input.SecondaryHours.ToString() + ":" + input.SecondaryMins.ToString()),
                    OperatorTime = TimeSpan.Parse(input.PrimaryHours.ToString() + ":" + input.PrimaryMins.ToString()),
                    DateCreated = DateTime.Now,
                    Deleted = false,
                    Code = "",
                    Description = input.Description,
                    DetailedPoint = input.DetailedPoint,
                    OriginalQuote = input.OriginalQuote,
                    QuoteNo = input.QuoteNumber,
                    SheetStatus = input.Status,
                    SINumber = input.SiNumber,
                    SiteId = input.Site,
                    SpecificLocation = input.SpecificLocation,
                    UsersId = input.PrimaryTechnician
                };
                var site = await _context.Sites.FindAsync(poco.SiteId);
                var lastCode = await _context.TimeSheets.OrderByDescending(x => x.DateCreated).FirstOrDefaultAsync();
                if (lastCode != null)
                {
                    int suffix = Convert.ToInt32(lastCode.Code.Split("-")[2]);
                    StringBuilder newPrefix = new StringBuilder();
                    StringBuilder newSuffix = new StringBuilder();
                    if (suffix == 9999)
                    {
                        newSuffix.Append("0000");
                        char firstPrefix = lastCode.Code.Split("-")[0][0];
                        char lastPrefix = lastCode.Code.Split("-")[0][1];
                        if (lastPrefix == 'Z')
                        {
                            lastPrefix = 'A';
                            int index = alphabet.IndexOf(firstPrefix);
                            firstPrefix = alphabet[index + 1];
                        }
                        else
                        {
                            int index = alphabet.IndexOf(lastPrefix);
                            lastPrefix = alphabet[index + 1];
                        }
                        newPrefix = new StringBuilder();
                        newPrefix.Append(firstPrefix);
                        newPrefix.Append(lastPrefix);
                    }
                    else
                    {
                        suffix += 1;
                        newSuffix.Append(string.Format("{0:D4}", suffix));
                        newPrefix.Append(lastCode.Code.Split("-")[1]);
                    }
                    poco.Code = site.Abbr + "-" + newPrefix.ToString() + "-" + newSuffix.ToString();
                }
                else
                {
                    poco.Code = site.Abbr + "-" + "AA-0001";
                }
                code = poco.Code;
                await _timesheet.AddTimesheet(poco);
                await _context.SaveChangesAsync();

                //foreach (var email in _configuration["clients:plumbery:emails"].Split("::"))
                //{
                //    await _emailSender.SendEmailAsync(email, "Timesheet " + poco.Code + " submitted", "");
                //}

                return new TimesheetResult
                {
                    IsSuccess = true,
                    TimesheetCode = poco.Code
                };
            }
            catch (Exception ex)
            {
                return new TimesheetResult
                {
                    ErrorMessage = ex.Message,
                    IsSuccess = true,
                    TimesheetCode = code
                };
            }
        }

        public async Task<SimpleResult> SaveMaterialItems(TimesheetCodeInput input)
        {
            try
            {
                var timesheet = await _context.TimeSheets.Where(x => x.Code == input.Code).FirstOrDefaultAsync();
                foreach (var mat in input.Materials)
                {
                    var materials = await _context.Materials.Where(x => x.StockCode == mat.StockCode).FirstOrDefaultAsync();
                    if (materials != null)
                    {
                        var inventory = await _context.Inventories.Where(x => x.MaterialId == materials.Id).FirstOrDefaultAsync();
                        var matItemPoco = new MaterialItemPoco
                        {
                            BOM_No = mat.BOM_No,
                            Deleted = false,
                            TimeSheetId = timesheet.Id,
                            Quantity = Convert.ToDecimal(mat.Quantity),
                            StockDescription = mat.StockDescription,
                            StockCode = mat.StockCode
                        };
                        inventory.Quantity = inventory.Quantity - matItemPoco.Quantity;
                        _context.Entry(inventory).State = EntityState.Modified;
                        _context.MaterialItems.Add(matItemPoco);
                    }
                    else
                    {
                        var non = new NonMaterialItemPoco
                        {
                            BOM_No = mat.BOM_No,
                            Deleted = false,
                            Description = mat.StockDescription,
                            Metric = mat.Quantity.ToString(),
                            TimeSheetId = timesheet.Id
                        };
                        _context.NonMaterialItems.Add(non);
                    }
                }
                await _context.SaveChangesAsync();
                return new SimpleResult
                {
                    IsSuccess = true
                };
            }
            catch
            {
                return new SimpleResult
                {
                    IsSuccess = true
                };
            }
        }

        public async Task<InventoryTimesheetViewModel> GetInventory()
        {
            var invs = await _context.Inventories.ToArrayAsync();
            var mats = await _context.Materials.ToArrayAsync();

            return new InventoryTimesheetViewModel
            {
                Inventory = invs,
                Materials = mats
            };
        }

        public async Task<IDropdownModel<string>[]> GetUsers()
        {
            try
            {
                var result = await _context.Users.Where(x => x.PtmEnabled == true).OrderBy(o => o.LastName).ToArrayAsync();
                return result.Select(x => new IDropdownModel<string>
                {
                    Text = x.LastName + ", " + x.FirstName,
                    Value = x.Id,
                    Selected = false
                }).ToArray();
            }
            catch
            {
                return null;
            }
        }

        public async Task<object> GetMaterials(MaterialIdInput input)
        {
            try
            {
                var warehouse = await _context.Warehouses.Where(x => x.UserId == input.PrimaryTechnicianId).FirstOrDefaultAsync();
                var result = await _context.Inventories.Where(x => x.WarehouseId == warehouse.Id).ToArrayAsync();
                return result.Select(x => new DropdownModel
                {
                    Value = x.Id,
                    Text = x.Quantity.ToString() + ": " + _context.Materials.Where(o => o.Id == x.MaterialId).FirstOrDefault().StockCode + " - " + _context.Materials.Where(o => o.Id == x.MaterialId).FirstOrDefault().StockDescription,
                    Selected = false
                }).ToArray();
            }
            catch (Exception ex)
            {
                return new SimpleResult
                {
                    ErrorMessage = JsonConvert.SerializeObject(ex)
                };
            }
        }

        public async Task<object> GetMaterial(InventoryIdInput input)
        {
            InventoryPoco inv;
            MaterialPoco material;
            try
            {
                inv = await _context.Inventories.FindAsync(input.Id);
                material = await _context.Materials.FindAsync(inv.MaterialId);
                return new
                {
                    inv.Id,
                    material.StockCode,
                    material.StockDescription,
                    input.Quantity,
                    input.BomNo,
                    exceeded = inv.Quantity < input.Quantity
                };
            }
            catch
            {
                inv = await _context.Inventories.FindAsync(input.Id);
                material = await _context.Materials.FindAsync(inv.MaterialId);
                return new SimpleResult
                {
                    ErrorMessage = JsonConvert.SerializeObject(inv)
                };
            }
        }

        public async Task<SimpleResult> UploadTimesheet(ByteInput input)
        {
            try
            {
                Attachment attachment = new Attachment(new MemoryStream(input.Bytes), input.Filename);
                ContentDisposition disposition = attachment.ContentDisposition;
                disposition.CreationDate = DateTime.Now;
                disposition.ModificationDate = DateTime.Now;
                disposition.ReadDate = DateTime.Now;
                disposition.Size = input.Bytes.Length;
                disposition.DispositionType = DispositionTypeNames.Attachment;
                var clients = _configuration["clients:plumbery:emails"];
                var emails = clients.Split("::");
                foreach (var email in emails)
                {
                    await _emailSender.SendEmailAsync(email, "Timesheet: " + input.Filename.Split('.')[0], input.Message, attachment);
                }
                return new SimpleResult
                {
                    IsSuccess = true
                };
            }
            catch (Exception ex)
            {
                return new SimpleResult
                {
                    IsSuccess = false,
                    ErrorMessage = ex.Message
                };
            }
        }

        public async Task<List<TimesheetView>> GetTimesheets(UserIdInput input)
        {
            try
            {
                var result = await _procedureService.CallProcedureAsync<TimesheetView>("[dbo].[ReadTimsheets]", new { });
                return result.Select(s => new TimesheetView
                {
                    AssistantTime = s.AssistantTime,
                    Code = s.Code,
                    DateCreated = s.DateCreated,
                    Description = s.Description,
                    DetailedPoint = s.DetailedPoint,
                    IsSelected = s.IsSelected,
                    Materials = _procedureService.CallProcedureAsync<MaterialCountModel>("[dbo].[ReadCountMaterials]", new { TimesheetsId = s.TimesheetId }).Result.FirstOrDefault().MaterialCount +
                    _procedureService.CallProcedureAsync<MaterialCountModel>("[dbo].[ReadCountMaterials]", new { TimesheetsId = s.TimesheetId }).Result.FirstOrDefault().NonMaterialCount,
                    OperatorTime = s.OperatorTime,
                    OriginalQuote = s.OriginalQuote,
                    Plumber = s.Plumber,
                    QuoteNo = s.QuoteNo,
                    SINumber = s.SINumber,
                    Site = s.Site,
                    SpecificLocation = s.SpecificLocation,
                    Status = s.Status,
                    TimesheetId = s.TimesheetId
                }).ToList();
            }
            catch
            {
                return new List<TimesheetView>();
            }
        }

        public async Task<SimpleResult> DeleteTimesheet(TimesheetIdInput input)
        {
            try
            {
                await _timesheet.DeleteTimesheet(input);
                return new SimpleResult
                {
                    IsSuccess = true
                };
            }
            catch
            {
                return new SimpleResult
                {
                    IsSuccess = false
                };
            }
        }

        public async Task<object> GetTimesheetMaterials(TimesheetIdInput input)
        {
            try
            {
                var mat = await _context.MaterialItems.Where(x => x.TimeSheetId == input.TimesheetId).ToArrayAsync();
                var non = await _context.NonMaterialItems.Where(x => x.TimeSheetId == input.TimesheetId).ToArrayAsync();
                return new
                {
                    material = mat,
                    nonMaterial = non
                };
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<GetMaterialsByTimesheetView>> GetMaterialsByTimesheet(long input)
        {
            try
            {
                var mats = await _procedureService.CallProcedureAsync<MaterialItemViewModel>("[dbo].[ReadMaterialsByTimesheet]", new { TimesheetsId = input });
                var nons = await _procedureService.CallProcedureAsync<NonMaterialItemViewModel>("[dbo].[ReadNonMaterialsByTimesheet]", new { TimesheetsId = input });
                return new List<GetMaterialsByTimesheetView>
                {
                    new GetMaterialsByTimesheetView
                    {
                        Materials = mats,
                        NonMaterials = nons
                    }
                };
            }
            catch
            {
                return new List<GetMaterialsByTimesheetView>();
            }
        }
    }
}
