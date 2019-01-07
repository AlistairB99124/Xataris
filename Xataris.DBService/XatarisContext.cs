using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Xataris.Domain.Pocos;
using static Xataris.DBService.Configuration;

namespace Xataris.DBService
{
    public class XatarisContext : IdentityDbContext<UserPoco>
    {
        public XatarisContext(DbContextOptions<XatarisContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfiguration(new InventoryMap());
            builder.ApplyConfiguration(new LocationMap());
            builder.ApplyConfiguration(new MaterialMap());
            builder.ApplyConfiguration(new ModuleMap());
            builder.ApplyConfiguration(new SiteMap());
            builder.ApplyConfiguration(new UserGroupMap());
            builder.ApplyConfiguration(new TimeSheetMap());
            builder.ApplyConfiguration(new MaterialItemMap());
            builder.ApplyConfiguration(new NonMaterialItemMap());
            builder.ApplyConfiguration(new WarehouseMap());
            builder.ApplyConfiguration(new LookupValuesMap());

            builder.Entity<UserGroupPoco>().HasData(
                new UserGroupPoco
                {
                    Id = 1,
                    AccessLevel = AccessLevel.Admin,
                    Description = "Admin Accounts",
                    Deleted = false,
                    Title = "Admin",
                    Modules = "[{ 'Id':1,'Deleted':false,'Name':'PTM','Description':'Personal Timesheet Management'},{ 'Id':2,'Deleted':false,'Name':'Orders','Description':'Order management'},{ 'Id':3,'Deleted':false,'Name':'Sites','Description':'Site Management'},{ 'Id':4,'Deleted':false,'Name':'Inventory','Description':'Inventory Management'},{ 'Id':5,'Deleted':false,'Name':'Users','Description':'User and Group Management'}]",
                });

            builder.Entity<ModulePoco>().HasData(
                new List<ModulePoco>
                {
                    new ModulePoco
                    {
                        Deleted = false,
                        Description = "Personal Timesheet Management",
                        Id = 1,
                        Name = "PTM"
                    },
                    new ModulePoco
                    {
                        Deleted = false,
                        Description = "Order management",
                        Id = 2,
                        Name = "Orders"
                    },
                    new ModulePoco
                    {
                        Deleted = false,
                        Description = "Site Management",
                        Id = 3,
                        Name = "Sites"
                    },
                    new ModulePoco
                    {
                        Deleted = false,
                        Description = "Inventory Management",
                        Id = 4,
                        Name = "Inventory"
                    },
                    new ModulePoco
                    {
                        Deleted = false,
                        Description = "User and Group Management",
                        Id = 5,
                        Name = "Users"
                    }
                }
            );
        }

        public DbSet<InventoryPoco> Inventories { get; set; }
        public DbSet<WarehousePoco> Warehouses { get; set; }
        public DbSet<MaterialPoco> Materials { get; set; }
        public DbSet<LocationPoco> Locations { get; set; }
        public DbSet<ModulePoco> Modules { get; set; }
        public DbSet<UserGroupPoco> UserGroups { get; set; }
        public DbSet<TimeSheetPoco> TimeSheets { get; set; }
        public DbSet<MaterialItemPoco> MaterialItems { get; set; }
        public DbSet<NonMaterialItemPoco> NonMaterialItems { get; set; }
        public DbSet<SitePoco> Sites { get; set; }
        public DbSet<OrderPoco> Orders { get; set; }
        public DbSet<OrderItemPoco> OrderItems { get; set; }
        public DbSet<LookupValue> LookupValues { get; set; }      
    }
}
