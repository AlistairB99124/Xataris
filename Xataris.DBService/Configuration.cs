using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Xataris.Domain.Pocos;

namespace Xataris.DBService {
    public class Configuration {
        public class InventoryMap : IEntityTypeConfiguration<InventoryPoco> {
            public void Configure(EntityTypeBuilder<InventoryPoco> builder) {
                builder.HasKey(t => t.Id);
                builder.Property(t => t.Quantity).HasColumnType("decimal(9, 2)");
                builder.HasOne(t => t.Material)
                    .WithMany(p => p.Inventory)
                    .HasForeignKey(d => d.MaterialId)
                    .OnDelete(DeleteBehavior.ClientSetNull); ;
                builder.HasOne(t => t.Warehouse)
                    .WithMany(p => p.Inventory)
                    .HasForeignKey(d => d.WarehouseId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
                builder.ToTable("Inventory", "dbo");
            }
        }
        public class LocationMap : IEntityTypeConfiguration<LocationPoco> {
            public void Configure(EntityTypeBuilder<LocationPoco> builder) {
                builder.HasKey(t => t.Id);
                builder.Property(t => t.Id).IsRequired();
                builder.ToTable("Location", "dbo");
            }
        }
        public class MaterialMap : IEntityTypeConfiguration<MaterialPoco> {
            public void Configure(EntityTypeBuilder<MaterialPoco> builder) {
                builder.HasKey(t => t.Id);
                builder.Property(t => t.Cost).IsRequired().HasColumnType("decimal(9, 2)"); ;
                builder.Property(t => t.StockCode).IsRequired();
                builder.Property(t => t.StockDescription).IsRequired();
                builder.ToTable("Material", "dbo");
            }
        }

        public class SiteMap : IEntityTypeConfiguration<SitePoco> {
            public void Configure(EntityTypeBuilder<SitePoco> builder) {
                builder.HasKey(t => t.Id);
                builder.Property(t => t.Abbr).IsRequired();
                builder.Property(t => t.Name).IsRequired();
                builder.ToTable("Site", "dbo");
            }
        }

        public class LookupValuesMap : IEntityTypeConfiguration<LookupValue> {
            public void Configure(EntityTypeBuilder<LookupValue> builder) {
                builder.HasKey(t => t.Id);
                builder.Property(t => t.DataType).IsRequired();
                builder.Property(t => t.DataValue).IsRequired();
                builder.Property(t => t.Id).IsRequired();
                builder.Property(t => t.LookupValuesId).IsRequired();
                builder.Property(t => t.Updated).IsRequired();
                builder.ToTable("LookupValue", "dbo");
            }
        }

        public class TimeSheetMap : IEntityTypeConfiguration<TimeSheetPoco> {
            public void Configure(EntityTypeBuilder<TimeSheetPoco> builder) {
                builder.HasKey(t => t.Id);
                builder.Property(t => t.AssistantTime).IsRequired();
                builder.Property(t => t.Code).IsRequired();
                builder.Property(t => t.DateCreated).IsRequired();
                builder.Property(t => t.Description).IsRequired(false);
                builder.Property(t => t.DetailedPoint).IsRequired(false);
                builder.Property(t => t.OriginalQuote).IsRequired();
                builder.Property(t => t.OperatorTime).IsRequired();
                builder.Property(t => t.QuoteNo).IsRequired(false);
                builder.Property(t => t.SheetStatus).IsRequired();
                builder.Property(t => t.SINumber).IsRequired(false);
                builder.Property(t => t.SpecificLocation).IsRequired(false);
                builder.Property(t => t.UsersId).IsRequired();

                builder.HasOne(t => t.Site)
                   .WithMany(p => p.TimeSheets)
                    .HasForeignKey(d => d.SiteId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
                builder.HasOne(t => t.User)
                        .WithMany(p => p.Timesheets)
                    .HasForeignKey(d => d.UsersId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
                builder.ToTable("TimeSheet", "dbo");
            }
        }
        public class NonMaterialItemMap : IEntityTypeConfiguration<NonMaterialItemPoco> {
            public void Configure(EntityTypeBuilder<NonMaterialItemPoco> builder) {
                builder.HasKey(t => t.Id);
                builder.Property(t => t.Description).IsRequired();
                builder.Property(t => t.Metric).IsRequired(false);
                builder.Property(t => t.BOM_No).IsRequired(false);
                builder.HasOne(t => t.TimeSheet)
                     .WithMany(p => p.NonMaterials)
                    .HasForeignKey(d => d.TimeSheetId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
                builder.ToTable("NonMaterialItem", "dbo");
            }
        }
        public class MaterialItemMap : IEntityTypeConfiguration<MaterialItemPoco> {
            public void Configure(EntityTypeBuilder<MaterialItemPoco> builder) {
                builder.HasKey(t => t.Id);
                builder.Property(t => t.BOM_No).IsRequired(false);
                builder.Property(t => t.Quantity).IsRequired().HasColumnType("decimal(9, 2)");
                builder.Property(t => t.StockDescription).IsRequired();
                builder.Property(t => t.StockCode).IsRequired();
                builder.Property(t => t.TimeSheetId).IsRequired();
                builder.Property(t => t.Deleted).IsRequired().HasDefaultValue(false);
                builder.HasOne(t => t.TimeSheet)
                     .WithMany(p => p.Materials)
                    .HasForeignKey(d => d.TimeSheetId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
                builder.ToTable("MaterialItem", "dbo");
            }
        }
        public class WarehouseMap : IEntityTypeConfiguration<WarehousePoco> {
            public void Configure(EntityTypeBuilder<WarehousePoco> builder) {
                builder.HasKey(t => t.Id);
                builder.Property(t => t.Name).IsRequired(false);
                builder.Property(t => t.UserId).IsRequired();
                builder.HasOne(t => t.User).WithMany(o => o.Warehouses).HasForeignKey(s => s.UserId);
                builder.ToTable("Warehouse", "dbo");
            }
        }
        public class OrderMap : IEntityTypeConfiguration<OrderPoco> {
            public void Configure(EntityTypeBuilder<OrderPoco> builder) {
                builder.HasKey(t => t.Id);
                builder.Property(t => t.DateCreated).IsRequired();
                builder.Property(t => t.Plumber).IsRequired();
                builder.Property(t => t.Site).IsRequired();
                builder.ToTable("Order", "dbo");
            }
        }
        public class OrderItemMap : IEntityTypeConfiguration<OrderItemPoco> {
            public void Configure(EntityTypeBuilder<OrderItemPoco> builder) {
                builder.HasKey(t => t.Id);
                builder.Property(t => t.OrderId).IsRequired();
                builder.Property(t => t.Quantity).IsRequired().HasColumnType("decimal(9, 2)"); ;
                builder.Property(t => t.StockCode).IsRequired().HasColumnType("decimal(9, 2)"); ;
                builder.Property(t => t.StockDescription).IsRequired();

                builder.HasOne(t => t.Order)
                     .WithMany(p => p.OrderItems)
                    .HasForeignKey(d => d.OrderId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
                builder.ToTable("OrderItem", "dbo");
            }
        }

        public class UserGroupMap : IEntityTypeConfiguration<UserGroupPoco> {
            public void Configure(EntityTypeBuilder<UserGroupPoco> builder) {
                builder.HasKey(t => t.Id);
                builder.Property(t => t.AccessLevel).IsRequired();
                builder.Property(t => t.Description).IsRequired();
                builder.Property(t => t.Title).IsRequired();
                builder.Property(t => t.Modules).IsRequired();
                builder.ToTable("UserGroup", "dbo");
            }
        }

        public class UserMap : IEntityTypeConfiguration<UserPoco> {
            public void Configure(EntityTypeBuilder<UserPoco> builder) {
                builder.HasKey(t => t.Id);
                builder.Property(t => t.PtmEnabled).IsRequired().HasDefaultValue(false);
                builder.Property(t => t.GroupId).IsRequired();

                builder.HasMany(t => t.Timesheets).WithOne(p => p.User).HasForeignKey(d => d.UsersId);
                builder.HasMany(t => t.Warehouses).WithOne(p => p.User).HasForeignKey(d => d.UserId);
                builder.HasOne(t => t.Group)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.GroupId);
                builder.ToTable("UserGroup", "dbo");
            }
        }

        public class ModuleMap : IEntityTypeConfiguration<ModulePoco> {
            public void Configure(EntityTypeBuilder<ModulePoco> builder) {
                builder.HasKey(t => t.Id);
                builder.Property(t => t.Description).IsRequired();
                builder.Property(t => t.Name).IsRequired();

                builder.ToTable("Module", "dbo");
            }
        }

        public class GamesMap : IEntityTypeConfiguration<Game> {
            public void Configure(EntityTypeBuilder<Game> builder) {
                builder.HasKey(t => t.Id);
                builder.ToTable("Game", "dbo");
            }
        }

        public class PlayerMap : IEntityTypeConfiguration<Player> {
            public void Configure(EntityTypeBuilder<Player> builder) {
                builder.HasKey(t => t.Id);
                builder.ToTable("Player", "dbo");
            }
        }



        public class QuoteMap : IEntityTypeConfiguration<Quote>
        {
            public void Configure(EntityTypeBuilder<Quote> builder)
            {
                builder.HasKey(t => t.QuotesId);
                builder.Property(t => t.SubTotal).IsRequired();
                builder.Property(t => t.Total).IsRequired();
                builder.Property(t => t.UsersId).IsRequired();
                builder.Property(t => t.VAT).IsRequired();
                builder.Property(t => t.CustomersId).IsRequired();
                builder.Property(t => t.Discount).IsRequired();

                builder.HasOne(t => t.User)
                    .WithMany(o => o.Quotes)
                    .HasForeignKey(s => s.UsersId)
                    .HasConstraintName("ForeignKey_quote_user");
                builder.HasOne(t => t.Customer)
                    .WithMany(o => o.Quotes)
                    .HasForeignKey(s => s.CustomersId)
                    .HasConstraintName("ForeignKey_quote_customer");


                builder.ToTable("Quotes", "dbo");
            }
        }

        public class QuoteItemMap : IEntityTypeConfiguration<QuoteItem>
        {
            public void Configure(EntityTypeBuilder<QuoteItem> builder)
            {
                builder.HasKey(t => t.QuoteItemsId);
                builder.Property(t => t.ItemsId).IsRequired();
                builder.Property(t => t.QuotesId).IsRequired();

                builder.HasOne(t => t.Quote)
                    .WithMany(o => o.QuoteItems)
                    .HasForeignKey(s => s.QuotesId)
                    .HasConstraintName("ForeignKey_quoteitem_quote");

                builder.HasOne(t => t.Item)
                    .WithMany(o => o.QuoteItems)
                    .HasForeignKey(s => s.ItemsId)
                    .HasConstraintName("ForeignKey_quoteitem_item");

                builder.ToTable("QuoteItems", "dbo");
            }
        }
        public class QuoteProductMap : IEntityTypeConfiguration<QuoteProduct>
        {
            public void Configure(EntityTypeBuilder<QuoteProduct> builder)
            {
                builder.HasKey(t => t.QuoteProductsId);
                builder.Property(t => t.ProductsId).IsRequired();
                builder.Property(t => t.QuotesId).IsRequired();

                builder.HasOne(t => t.Product)
                    .WithMany(o => o.QuoteProducts)
                    .HasForeignKey(s => s.ProductsId)
                    .HasConstraintName("ForeignKey_quoteproduct_product");

                builder.HasOne(t => t.Quote)
                    .WithMany(o => o.QuoteProducts)
                    .HasForeignKey(s => s.QuotesId)
                    .HasConstraintName("ForeignKey_quoteproduct_quote");

                builder.ToTable("QuoteProducts", "dbo");
            }
        }

        public class ItemMap : IEntityTypeConfiguration<Item>
        {
            public void Configure(EntityTypeBuilder<Item> builder)
            {
                builder.HasKey(t => t.ItemsId);
                builder.Property(t => t.ItemTypesId).IsRequired();
                builder.Property(t => t.Metric).IsRequired();
                builder.Property(t => t.Name).IsRequired();
                builder.Property(t => t.SuppliersId).IsRequired();
                builder.Property(t => t.UnitPrice).IsRequired();

                builder.HasOne(t => t.Supplier)
                    .WithMany(o => o.Items)
                    .HasForeignKey(s => s.SuppliersId)
                    .HasConstraintName("ForeignKey_item_Supplier");

                builder.HasOne(t => t.ItemType)
                    .WithMany(o => o.Items)
                    .HasForeignKey(s => s.ItemsId)
                    .HasConstraintName("ForeignKey_item_ItemTypes");

                builder.ToTable("Items", "dbo");
            }
        }

        public class ItemInventoryMap : IEntityTypeConfiguration<ItemInventory>
        {
            public void Configure(EntityTypeBuilder<ItemInventory> builder)
            {
                builder.HasKey(t => t.ItemInventoriesId);
                builder.Property(t => t.ItemsId).IsRequired();
                builder.Property(t => t.Quantity).IsRequired();
                builder.HasOne(t => t.Item)
                    .WithMany(o => o.ItemInventories)
                    .HasForeignKey(s => s.ItemsId)
                    .HasConstraintName("ForeignKey_item_ItemInventories");
                builder.ToTable("ItemInventories", "dbo");
            }
        }

        public class CustomerMap : IEntityTypeConfiguration<Customer>
        {
            public void Configure(EntityTypeBuilder<Customer> builder)
            {
                builder.HasKey(t => t.CustomersId);

                builder.Property(t => t.Address).IsRequired();
                builder.Property(t => t.Name).IsRequired();
                builder.Property(t => t.Company).IsRequired();                

                builder.ToTable("Customers", "dbo");
            }
        }

        public class ItemTypeMap : IEntityTypeConfiguration<ItemType>
        {
            public void Configure(EntityTypeBuilder<ItemType> builder)
            {
                builder.HasKey(t => t.ItemTypesId);
                builder.Property(t => t.ItemTypeGroupsId).IsRequired();
                builder.Property(t => t.Name).IsRequired();

                builder.HasOne(t => t.ItemTypeGroup)
                    .WithMany(o => o.ItemTypes)
                    .HasForeignKey(s => s.ItemTypeGroupsId)
                    .HasConstraintName("ForeignKey_itemTypeGroup_ItemTypes");

                builder.ToTable("ItemTypes", "dbo");
            }
        }

        public class ItemTypeGroupMap : IEntityTypeConfiguration<ItemTypeGroup>
        {
            public void Configure(EntityTypeBuilder<ItemTypeGroup> builder)
            {
                builder.HasKey(t => t.ItemTypeGroupsId);
                builder.Property(t => t.Name).IsRequired();

                builder.ToTable("ItemTypeGroups", "dbo");
            }
        }

        public class PredefinedItemMap : IEntityTypeConfiguration<PredefinedItem>
        {
            public void Configure(EntityTypeBuilder<PredefinedItem> builder)
            {
                builder.HasKey(t => t.PredefinedItemsId);
                builder.Property(t => t.ItemsId).IsRequired();
                builder.Property(t => t.ProductsId).IsRequired();
                builder.Property(t => t.Quantity).IsRequired();

                builder.HasOne(t => t.Item)
                    .WithMany(s => s.PredefinedItems)
                    .HasForeignKey(o => o.ItemsId)
                    .HasConstraintName("ForeignKey_Item_Predefined");

                builder.HasOne(t => t.Product)
                    .WithMany(o => o.PredefinedItems)
                    .HasForeignKey(p => p.ProductsId)
                    .HasConstraintName("ForeignKey_Product_Predefined");

                builder.ToTable("PredefinedItems", "dbo");
            }
        }

        public class SupplierMap : IEntityTypeConfiguration<Supplier>
        {
            public void Configure(EntityTypeBuilder<Supplier> builder)
            {
                builder.HasKey(t => t.SuppliersId);
                builder.Property(t => t.Name);
                builder.Property(t => t.Telephone);
                builder.Property(t => t.WebAddress);
                builder.ToTable("Suppliers", "dbo");
            }
        }

        public class ProductMap : IEntityTypeConfiguration<Product>
        {
            public void Configure(EntityTypeBuilder<Product> builder)
            {
                builder.HasKey(t => t.ProductsId);
                builder.Property(t => t.Name);
                builder.Property(t => t.Description);
                builder.ToTable("Products", "dbo");
            }
        }

    }
}
