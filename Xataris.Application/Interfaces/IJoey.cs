using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.Application.Interfaces
{
    public interface IJoey
    {
        Task<DataTabResult> GetDataTabResults();
        Task<SimpleResult> SaveCustomer(CustomerInput input);
    }
}
