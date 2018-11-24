using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xataris.Domain.Pocos;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.Domain.Interfaces
{
    public interface IOrderDomain
    {
        Task<SimpleResult> Add(OrderPoco input);
        Task<SimpleResult> Edit(OrderPoco input);
        Task<SimpleResult> Delete(long input);
    }
}
