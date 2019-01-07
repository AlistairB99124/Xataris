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
    }
}
