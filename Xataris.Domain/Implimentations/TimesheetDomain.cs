using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xataris.DBService;
using Xataris.Domain.Interfaces;
using Xataris.Domain.Pocos;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.Domain.Implimentations
{
    public class TimesheetDomain : ITimesheetDomain
    {
        private XatarisContext _context;

        public TimesheetDomain(XatarisContext context)
        {
            _context = context;
        }

        public async Task<TimesheetResult> AddTimesheet(TimeSheetPoco poco)
        {
            var result = await _context.AddAsync(poco);
            await _context.SaveChangesAsync();
            return new TimesheetResult
            {
                Id = poco.Id,
                IsSuccess = true,
                TimesheetCode = poco.Code
            };
        }

        public async Task DeleteTimesheet(TimesheetIdInput input)
        {
            var timesheet = await _context.TimeSheets.FindAsync(input.TimesheetId);
            _context.TimeSheets.Remove(timesheet);
            await _context.SaveChangesAsync();
        }
    }
}
