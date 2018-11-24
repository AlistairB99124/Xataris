using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xataris.DBService;
using Xataris.Domain.Interfaces;
using Xataris.Domain.Pocos;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.Domain.Implimentations
{
    public class OrderDomain : IOrderDomain
    {
        private readonly XatarisContext _context;

        public OrderDomain(XatarisContext context)
        {
            _context = context;
        }
        public async Task<SimpleResult> Add(OrderPoco input)
        {
            var poco = new OrderPoco
            {
                DateCreated = input.DateCreated,
                Deleted = false,
                Plumber = input.Plumber,
                Site = input.Site
            };
            await _context.Orders.AddAsync(poco);
            await _context.SaveChangesAsync();
            var selected = new List<OrderItemPoco>();
            foreach(var s in input.OrderItems)
            {
                s.OrderId = Convert.ToInt32(poco.Id);
                selected.Add(new OrderItemPoco
                {
                    Deleted = false,
                    OrderId = s.OrderId,
                    Quantity = s.Quantity,
                    StockCode = s.StockCode,
                    StockCost = s.StockCost,
                    StockDescription = s.StockDescription
                });
            }
            await _context.OrderItems.AddRangeAsync(selected);
            await _context.SaveChangesAsync();
            return new SimpleResult
            {
                IsSuccess = true
            };
        }

        public async Task<SimpleResult> Delete(long input)
        {
            var order = await _context.Orders.FindAsync(input);
            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return new SimpleResult
            {
                IsSuccess = true
            };
        }

        public async Task<SimpleResult> Edit(OrderPoco input)
        {
            _context.Orders.Attach(input).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return new SimpleResult
            {
                IsSuccess = true
            };
        }
    }
}
