using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xataris.Application.Interfaces;
using Xataris.DBService;
using Xataris.Domain.Pocos;
using Xataris.Infrastructure.ViewModels;

namespace Xataris.Application.Implimentations
{
    public class Joey : IJoey
    {
        private readonly XatarisContext _xatarisContext;

        public Joey(XatarisContext xatarisContext)
        {
            _xatarisContext = xatarisContext;
        }

        public async Task<DataTabResult> GetDataTabResults()
        {
            try
            {
                return new DataTabResult
                {
                    Customers = await _xatarisContext.Customers.ToArrayAsync(),
                    ItemInventories = await _xatarisContext.ItemInventories.ToArrayAsync(),
                    Items = await _xatarisContext.Items.ToArrayAsync(),
                    ItemTypeGroups = await _xatarisContext.ItemTypeGroups.ToArrayAsync(),
                    ItemTypes = await _xatarisContext.ItemTypes.ToArrayAsync(),
                    PredefinedItems = await _xatarisContext.PredefinedItems.ToArrayAsync(),
                    QuoteItems = await _xatarisContext.QuoteItems.ToArrayAsync(),
                    QuoteProducts = await _xatarisContext.QuoteProducts.ToArrayAsync(),
                    Quotes = await _xatarisContext.Quotes.ToArrayAsync(),
                    Suppliers = await _xatarisContext.Suppliers.ToArrayAsync(),
                    Products = await _xatarisContext.Products.ToArrayAsync(),
                    Users = await _xatarisContext.Users.ToArrayAsync()
                };
            }
            catch (Exception ex)
            {
                return new DataTabResult();
            }
        }

        public async Task<SimpleResult> SaveCustomer(CustomerInput input)
        {
            try
            {
                if(input.CustomersId == null)
                {
                    var customer = new Customer
                    {
                        Name = input.Name,
                        Address = input.Address,
                        Company = input.Company,
                        Quotes = new List<Quote>()
                    };
                    await _xatarisContext.Customers.AddAsync(customer);
                    await _xatarisContext.SaveChangesAsync();
                    return new SimpleResult
                    {
                        IsSuccess = true
                    };
                } else
                {
                    var customer = await _xatarisContext.Customers.FindAsync(input.CustomersId);
                    customer.Address = input.Address;
                    customer.Company = input.Company;
                    customer.Name = input.Name;
                    _xatarisContext.Entry(customer).State = EntityState.Modified;
                    await _xatarisContext.SaveChangesAsync();
                    return new SimpleResult
                    {
                        IsSuccess = true
                    };
                }
            }
            catch(Exception ex)
            {
                return new SimpleResult();
            }
        }
    }
}
