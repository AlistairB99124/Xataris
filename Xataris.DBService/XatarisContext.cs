using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
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
            //builder.ApplyConfiguration(new GamesMap());
            //builder.ApplyConfiguration(new PlayerMap());

            //builder.ApplyConfiguration(new QuoteMap());
            //builder.ApplyConfiguration(new QuoteItemMap());
            //builder.ApplyConfiguration(new QuoteProductMap());
            //builder.ApplyConfiguration(new ItemMap());
            //builder.ApplyConfiguration(new ItemInventoryMap());
            //builder.ApplyConfiguration(new CustomerMap());
            //builder.ApplyConfiguration(new ItemTypeMap());
            //builder.ApplyConfiguration(new ItemTypeGroupMap());
            //builder.ApplyConfiguration(new PredefinedItemMap());
            //builder.ApplyConfiguration(new SupplierMap());
            //builder.ApplyConfiguration(new ProductMap());
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
        //public DbSet<Game> Games { get; set; }
        //public DbSet<Player> Players { get; set; }

        //public DbSet<Quote> Quotes { get; set; }
        //public DbSet<QuoteItem> QuoteItems { get; set; }
        //public DbSet<QuoteProduct> QuoteProducts { get; set; }
        //public DbSet<Item> Items { get; set; }
        //public DbSet<ItemInventory> ItemInventories { get; set; }
        //public DbSet<Customer> Customers { get; set; }
        //public DbSet<ItemType> ItemTypes { get; set; }
        //public DbSet<ItemTypeGroup> ItemTypeGroups { get; set; }
        //public DbSet<PredefinedItem> PredefinedItems { get; set; }
        //public DbSet<Supplier> Suppliers { get; set; }
        //public DbSet<Product> Products { get; set; }        
    }
}
