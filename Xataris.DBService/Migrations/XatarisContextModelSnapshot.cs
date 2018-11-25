﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Xataris.DBService;

namespace Xataris.DBService.Migrations
{
    [DbContext(typeof(XatarisContext))]
    partial class XatarisContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.1-rtm-30846")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.Customer", b =>
                {
                    b.Property<long>("CustomersId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .IsRequired();

                    b.Property<string>("Company")
                        .IsRequired();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("CustomersId");

                    b.ToTable("Customers","dbo");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.Game", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AvailableBlocks");

                    b.Property<string>("Board");

                    b.Property<bool>("Finished");

                    b.Property<DateTime>("LastPLayed");

                    b.Property<string>("Name");

                    b.Property<string>("PlayerOne");

                    b.Property<string>("PlayerTwo");

                    b.Property<string>("UsedBlocks");

                    b.HasKey("Id");

                    b.ToTable("Game","dbo");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.InventoryPoco", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateAdded");

                    b.Property<DateTime>("DateModified");

                    b.Property<bool>("Deleted");

                    b.Property<long>("MaterialId");

                    b.Property<string>("ModifiedBy");

                    b.Property<decimal>("Quantity")
                        .HasColumnType("decimal(9, 2)");

                    b.Property<long>("WarehouseId");

                    b.HasKey("Id");

                    b.HasIndex("MaterialId");

                    b.HasIndex("WarehouseId");

                    b.ToTable("Inventory","dbo");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.Item", b =>
                {
                    b.Property<long>("ItemsId");

                    b.Property<long>("ItemTypesId");

                    b.Property<string>("Metric")
                        .IsRequired();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<long>("SuppliersId");

                    b.Property<decimal>("UnitPrice");

                    b.HasKey("ItemsId");

                    b.HasIndex("SuppliersId");

                    b.ToTable("Items","dbo");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.ItemInventory", b =>
                {
                    b.Property<long>("ItemInventoriesId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("ItemsId");

                    b.Property<decimal>("Quantity");

                    b.HasKey("ItemInventoriesId");

                    b.HasIndex("ItemsId");

                    b.ToTable("ItemInventories","dbo");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.ItemType", b =>
                {
                    b.Property<long>("ItemTypesId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("ItemTypeGroupsId");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("ItemTypesId");

                    b.HasIndex("ItemTypeGroupsId");

                    b.ToTable("ItemTypes","dbo");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.ItemTypeGroup", b =>
                {
                    b.Property<long>("ItemTypeGroupsId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("ItemTypeGroupsId");

                    b.ToTable("ItemTypeGroups","dbo");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.LocationPoco", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Deleted");

                    b.Property<float>("Lat");

                    b.Property<float>("Lng");

                    b.HasKey("Id");

                    b.ToTable("Location","dbo");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.LookupValue", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("DataType");

                    b.Property<string>("DataValue")
                        .IsRequired();

                    b.Property<long>("LookupValuesId");

                    b.Property<DateTime>("Updated");

                    b.HasKey("Id");

                    b.ToTable("LookupValue","dbo");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.MaterialItemPoco", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("BOM_No");

                    b.Property<bool>("Deleted")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(false);

                    b.Property<decimal>("Quantity")
                        .HasColumnType("decimal(9, 2)");

                    b.Property<string>("StockCode")
                        .IsRequired();

                    b.Property<string>("StockDescription")
                        .IsRequired();

                    b.Property<long>("TimeSheetId");

                    b.HasKey("Id");

                    b.HasIndex("TimeSheetId");

                    b.ToTable("MaterialItem","dbo");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.MaterialPoco", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal>("Cost")
                        .HasColumnType("decimal(9, 2)");

                    b.Property<bool>("Deleted");

                    b.Property<string>("StockCode")
                        .IsRequired();

                    b.Property<string>("StockDescription")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Material","dbo");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.ModulePoco", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Deleted");

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Module","dbo");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.NonMaterialItemPoco", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("BOM_No");

                    b.Property<bool>("Deleted");

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<string>("Metric");

                    b.Property<long>("TimeSheetId");

                    b.HasKey("Id");

                    b.HasIndex("TimeSheetId");

                    b.ToTable("NonMaterialItem","dbo");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.OrderItemPoco", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Deleted");

                    b.Property<long>("OrderId");

                    b.Property<decimal>("Quantity");

                    b.Property<string>("StockCode");

                    b.Property<decimal>("StockCost");

                    b.Property<string>("StockDescription");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.ToTable("OrderItems");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.OrderPoco", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateCreated");

                    b.Property<bool>("Deleted");

                    b.Property<string>("GUID");

                    b.Property<string>("Plumber");

                    b.Property<string>("Site");

                    b.HasKey("Id");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.Player", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("GameId");

                    b.Property<int>("Points");

                    b.Property<string>("Tray");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.ToTable("Player","dbo");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.PredefinedItem", b =>
                {
                    b.Property<long>("PredefinedItemsId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("ItemsId");

                    b.Property<long>("ProductsId");

                    b.Property<decimal>("Quantity");

                    b.HasKey("PredefinedItemsId");

                    b.HasIndex("ItemsId");

                    b.HasIndex("ProductsId");

                    b.ToTable("PredefinedItems","dbo");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.Product", b =>
                {
                    b.Property<long>("ProductsId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.HasKey("ProductsId");

                    b.ToTable("Products","dbo");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.Quote", b =>
                {
                    b.Property<long>("QuotesId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Customer")
                        .IsRequired();

                    b.Property<long?>("CustomersId");

                    b.Property<decimal>("Discount");

                    b.Property<decimal>("SubTotal");

                    b.Property<decimal>("Total");

                    b.Property<string>("UsersId")
                        .IsRequired();

                    b.Property<decimal>("VAT");

                    b.HasKey("QuotesId");

                    b.HasIndex("CustomersId");

                    b.HasIndex("UsersId");

                    b.ToTable("Quotes","dbo");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.QuoteItem", b =>
                {
                    b.Property<long>("QuoteItemsId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("ItemsId");

                    b.Property<long>("QuotesId");

                    b.HasKey("QuoteItemsId");

                    b.HasIndex("ItemsId");

                    b.HasIndex("QuotesId");

                    b.ToTable("QuoteItems","dbo");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.QuoteProduct", b =>
                {
                    b.Property<long>("QuoteProductsId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("ProductsId");

                    b.Property<long>("QuotesId");

                    b.HasKey("QuoteProductsId");

                    b.HasIndex("ProductsId");

                    b.HasIndex("QuotesId");

                    b.ToTable("QuoteProducts","dbo");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.SitePoco", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Abbr")
                        .IsRequired();

                    b.Property<string>("Address");

                    b.Property<bool>("Deleted");

                    b.Property<float>("Latitude");

                    b.Property<long?>("LocationPocoId");

                    b.Property<float>("Longitude");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("LocationPocoId");

                    b.ToTable("Site","dbo");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.Supplier", b =>
                {
                    b.Property<long>("SuppliersId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.Property<string>("Telephone");

                    b.Property<string>("WebAddress");

                    b.HasKey("SuppliersId");

                    b.ToTable("Suppliers","dbo");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.TimeSheetPoco", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<TimeSpan>("AssistantTime");

                    b.Property<string>("Code")
                        .IsRequired();

                    b.Property<DateTime>("DateCreated");

                    b.Property<bool>("Deleted");

                    b.Property<string>("Description");

                    b.Property<string>("DetailedPoint");

                    b.Property<TimeSpan>("OperatorTime");

                    b.Property<bool>("OriginalQuote");

                    b.Property<string>("QuoteNo");

                    b.Property<string>("SINumber");

                    b.Property<int>("SheetStatus");

                    b.Property<long>("SiteId");

                    b.Property<string>("SpecificLocation");

                    b.Property<string>("UsersId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("SiteId");

                    b.HasIndex("UsersId");

                    b.ToTable("TimeSheet","dbo");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.UserGroupPoco", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AccessLevel");

                    b.Property<bool>("Deleted");

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<string>("Modules")
                        .IsRequired();

                    b.Property<string>("Title")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("UserGroup","dbo");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.UserPoco", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<DateTime>("DateRegistered");

                    b.Property<bool>("Deleted");

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<DateTime>("EmploymentEndDate");

                    b.Property<DateTime>("EmploymentStartDate");

                    b.Property<string>("FirstName");

                    b.Property<long>("GroupId");

                    b.Property<DateTime>("LastLoggedIn");

                    b.Property<string>("LastName");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<bool>("PtmEnabled");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("GroupId");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.WarehousePoco", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Deleted");

                    b.Property<string>("Name");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Warehouse","dbo");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Xataris.Domain.Pocos.UserPoco")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Xataris.Domain.Pocos.UserPoco")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Xataris.Domain.Pocos.UserPoco")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Xataris.Domain.Pocos.UserPoco")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.InventoryPoco", b =>
                {
                    b.HasOne("Xataris.Domain.Pocos.MaterialPoco", "Material")
                        .WithMany("Inventory")
                        .HasForeignKey("MaterialId");

                    b.HasOne("Xataris.Domain.Pocos.WarehousePoco", "Warehouse")
                        .WithMany("Inventory")
                        .HasForeignKey("WarehouseId");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.Item", b =>
                {
                    b.HasOne("Xataris.Domain.Pocos.ItemType", "ItemType")
                        .WithMany("Items")
                        .HasForeignKey("ItemsId")
                        .HasConstraintName("ForeignKey_item_ItemTypes")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Xataris.Domain.Pocos.Supplier", "Supplier")
                        .WithMany("Items")
                        .HasForeignKey("SuppliersId")
                        .HasConstraintName("ForeignKey_item_Supplier")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.ItemInventory", b =>
                {
                    b.HasOne("Xataris.Domain.Pocos.Item", "Item")
                        .WithMany("ItemInventories")
                        .HasForeignKey("ItemsId")
                        .HasConstraintName("ForeignKey_item_ItemInventories")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.ItemType", b =>
                {
                    b.HasOne("Xataris.Domain.Pocos.ItemTypeGroup", "ItemTypeGroup")
                        .WithMany("ItemTypes")
                        .HasForeignKey("ItemTypeGroupsId")
                        .HasConstraintName("ForeignKey_itemTypeGroup_ItemTypes")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.MaterialItemPoco", b =>
                {
                    b.HasOne("Xataris.Domain.Pocos.TimeSheetPoco", "TimeSheet")
                        .WithMany("Materials")
                        .HasForeignKey("TimeSheetId");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.NonMaterialItemPoco", b =>
                {
                    b.HasOne("Xataris.Domain.Pocos.TimeSheetPoco", "TimeSheet")
                        .WithMany("NonMaterials")
                        .HasForeignKey("TimeSheetId");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.OrderItemPoco", b =>
                {
                    b.HasOne("Xataris.Domain.Pocos.OrderPoco", "Order")
                        .WithMany("OrderItems")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.PredefinedItem", b =>
                {
                    b.HasOne("Xataris.Domain.Pocos.Item", "Item")
                        .WithMany("PredefinedItems")
                        .HasForeignKey("ItemsId")
                        .HasConstraintName("ForeignKey_Item_Predefined")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Xataris.Domain.Pocos.Product", "Product")
                        .WithMany("PredefinedItems")
                        .HasForeignKey("ProductsId")
                        .HasConstraintName("ForeignKey_Product_Predefined")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.Quote", b =>
                {
                    b.HasOne("Xataris.Domain.Pocos.Customer")
                        .WithMany("Quotes")
                        .HasForeignKey("CustomersId");

                    b.HasOne("Xataris.Domain.Pocos.UserPoco", "User")
                        .WithMany("Quotes")
                        .HasForeignKey("UsersId")
                        .HasConstraintName("ForeignKey_quote_user")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.QuoteItem", b =>
                {
                    b.HasOne("Xataris.Domain.Pocos.Item", "Item")
                        .WithMany("QuoteItems")
                        .HasForeignKey("ItemsId")
                        .HasConstraintName("ForeignKey_quoteitem_item")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Xataris.Domain.Pocos.Quote", "Quote")
                        .WithMany("QuoteItems")
                        .HasForeignKey("QuotesId")
                        .HasConstraintName("ForeignKey_quoteitem_quote")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.QuoteProduct", b =>
                {
                    b.HasOne("Xataris.Domain.Pocos.Product", "Product")
                        .WithMany("QuoteProducts")
                        .HasForeignKey("ProductsId")
                        .HasConstraintName("ForeignKey_quoteproduct_product")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Xataris.Domain.Pocos.Quote", "Quote")
                        .WithMany("QuoteProducts")
                        .HasForeignKey("QuotesId")
                        .HasConstraintName("ForeignKey_quoteproduct_quote")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.SitePoco", b =>
                {
                    b.HasOne("Xataris.Domain.Pocos.LocationPoco")
                        .WithMany("Sites")
                        .HasForeignKey("LocationPocoId");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.TimeSheetPoco", b =>
                {
                    b.HasOne("Xataris.Domain.Pocos.SitePoco", "Site")
                        .WithMany("TimeSheets")
                        .HasForeignKey("SiteId");

                    b.HasOne("Xataris.Domain.Pocos.UserPoco", "User")
                        .WithMany("Timesheets")
                        .HasForeignKey("UsersId");
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.UserPoco", b =>
                {
                    b.HasOne("Xataris.Domain.Pocos.UserGroupPoco", "Group")
                        .WithMany("Users")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Xataris.Domain.Pocos.WarehousePoco", b =>
                {
                    b.HasOne("Xataris.Domain.Pocos.UserPoco", "User")
                        .WithMany("Warehouses")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}