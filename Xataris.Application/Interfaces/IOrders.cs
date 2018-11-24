using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xataris.Domain.Pocos;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.Application.Interfaces
{
    public interface IOrders
    {
        Task<SimpleResult> Add(OrderPoco input);
        Task<SimpleResult> Edit(OrderPoco input);
        Task<SimpleResult> Delete(long input);
        Task<OrderPoco> Get(long input);
        Task<OrderPoco[]> GetAll();
        Task<SitePoco[]> GetSites();
        Task<UserPoco[]> GetUsers();
        Task<MaterialPoco[]> GetMaterials();
        Task<OrderItemPoco[]> GetOrderItems(long input);
    }
}
