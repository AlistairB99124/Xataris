using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace Xataris.Domain.Pocos
{
    public class UserPoco : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateRegistered { get; set; }
        public DateTime LastLoggedIn { get; set; }
        public DateTime EmploymentStartDate { get; set; }
        public DateTime EmploymentEndDate { get; set; }
        public long GroupId { get; set; }
        public UserGroupPoco Group { get; set; }
        public bool PtmEnabled { get; set; }
        public bool Deleted { get; set; }

        public List<WarehousePoco> Warehouses { get; set; }
        public List<TimeSheetPoco> Timesheets{get;set;}
    }
}
