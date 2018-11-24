using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xataris.Domain.Pocos;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.Domain.Interfaces
{
    public interface ITimesheetDomain
    {
        Task<TimesheetResult> AddTimesheet(TimeSheetPoco poco);
        Task DeleteTimesheet(TimesheetIdInput input);
    }
}
