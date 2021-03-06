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
                .HasAnnotation("ProductVersion", "2.2.0-rtm-35687")
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

                    b.HasData(
                        new
                        {
                            Id = 1L,
                            Deleted = false,
                            Description = "Personal Timesheet Management",
                            Name = "PTM"
                        },
                        new
                        {
                            Id = 2L,
                            Deleted = false,
                            Description = "Order management",
                            Name = "Orders"
                        },
                        new
                        {
                            Id = 3L,
                            Deleted = false,
                            Description = "Site Management",
                            Name = "Sites"
                        },
                        new
                        {
                            Id = 4L,
                            Deleted = false,
                            Description = "Inventory Management",
                            Name = "Inventory"
                        },
                        new
                        {
                            Id = 5L,
                            Deleted = false,
                            Description = "User and Group Management",
                            Name = "Users"
                        });
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

                    b.HasData(
                        new
                        {
                            Id = 1L,
                            AccessLevel = 3,
                            Deleted = false,
                            Description = "Admin Accounts",
                            Modules = "[{ 'Id':1,'Deleted':false,'Name':'PTM','Description':'Personal Timesheet Management'},{ 'Id':2,'Deleted':false,'Name':'Orders','Description':'Order management'},{ 'Id':3,'Deleted':false,'Name':'Sites','Description':'Site Management'},{ 'Id':4,'Deleted':false,'Name':'Inventory','Description':'Inventory Management'},{ 'Id':5,'Deleted':false,'Name':'Users','Description':'User and Group Management'}]",
                            Title = "Admin"
                        });
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
