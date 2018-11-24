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

namespace Xataris.Application.Implimentations
{
    public class Orders : IOrders
    {
        private readonly XatarisContext _context;
        private IOrderDomain _domain;

        public Orders(XatarisContext context, IOrderDomain domain)
        {
            _context = context;
            _domain = domain;
        }


        public async Task<SimpleResult> Add(OrderPoco input)
        {
            try
            {
                return await _domain.Add(input);

            } catch
            {
                return new SimpleResult
                {
                    IsSuccess = false
                };
            }
        }

        public async Task<SimpleResult> Delete(long input)
        {
            try
            {
                return await _domain.Delete(input);

            }
            catch
            {
                return new SimpleResult
                {
                    IsSuccess = false
                };
            }
        }

        public async Task<SimpleResult> Edit(OrderPoco input)
        {
            try
            {
                return await _domain.Edit(input);
            }
            catch
            {
                return new SimpleResult
                {
                    IsSuccess = false
                };
            }
        }

        public async Task<OrderPoco> Get(long input)
        {
            try
            {
                return await _context.Orders.FindAsync(input);
            }
            catch
            {
                return null;
            }
        }

        public async Task<OrderPoco[]> GetAll()
        {
            try
            {
                return await _context.Orders.ToArrayAsync();

            }
            catch
            {
                return null;
            }
        }

        public async Task<MaterialPoco[]> GetMaterials()
        {
            try
            {
                return await _context.Materials.ToArrayAsync();

            }
            catch
            { 
                return null;
            }
        }

        public async Task<OrderItemPoco[]> GetOrderItems(long input)
        {
            try
            {
                return await _context.OrderItems.Where(x=>x.OrderId==input).ToArrayAsync();
            }
            catch
            {
                return null;
            }
        }

        public async Task<SitePoco[]> GetSites()
        {
            try
            {
                return await _context.Sites.ToArrayAsync();

            }
            catch
            {
                return null;
            }
        }

        public async Task<UserPoco[]> GetUsers()
        {
            try
            {
                return await _context.Users.ToArrayAsync();

            }
            catch
            {
                return null;
            }
        }
    }
}
