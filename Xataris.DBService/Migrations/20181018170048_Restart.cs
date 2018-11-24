using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Xataris.DBService.Migrations
{
    public partial class Restart : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "dbo");

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Deleted = table.Column<bool>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    Plumber = table.Column<string>(nullable: true),
                    Site = table.Column<string>(nullable: true),
                    GUID = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Customers",
                schema: "dbo",
                columns: table => new
                {
                    CustomersId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Company = table.Column<string>(nullable: false),
                    Address = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.CustomersId);
                });

            migrationBuilder.CreateTable(
                name: "Game",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PlayerOne = table.Column<string>(nullable: true),
                    PlayerTwo = table.Column<string>(nullable: true),
                    Board = table.Column<string>(nullable: true),
                    AvailableBlocks = table.Column<string>(nullable: true),
                    UsedBlocks = table.Column<string>(nullable: true),
                    Finished = table.Column<bool>(nullable: false),
                    LastPLayed = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Game", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ItemTypeGroups",
                schema: "dbo",
                columns: table => new
                {
                    ItemTypeGroupsId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemTypeGroups", x => x.ItemTypeGroupsId);
                });

            migrationBuilder.CreateTable(
                name: "Location",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Deleted = table.Column<bool>(nullable: false),
                    Lat = table.Column<float>(nullable: false),
                    Lng = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Location", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LookupValue",
                schema: "dbo",
                columns: table => new
                {
                    LookupValuesId = table.Column<long>(nullable: false),
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DataValue = table.Column<string>(nullable: false),
                    DataType = table.Column<int>(nullable: false),
                    Updated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LookupValue", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Material",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Deleted = table.Column<bool>(nullable: false),
                    StockCode = table.Column<string>(nullable: false),
                    StockDescription = table.Column<string>(nullable: false),
                    Cost = table.Column<decimal>(type: "decimal(9, 2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Material", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Module",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Deleted = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Module", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Player",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<string>(nullable: true),
                    Points = table.Column<int>(nullable: false),
                    GameId = table.Column<long>(nullable: false),
                    Tray = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Player", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                schema: "dbo",
                columns: table => new
                {
                    ProductsId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.ProductsId);
                });

            migrationBuilder.CreateTable(
                name: "Suppliers",
                schema: "dbo",
                columns: table => new
                {
                    SuppliersId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    WebAddress = table.Column<string>(nullable: true),
                    Telephone = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Suppliers", x => x.SuppliersId);
                });

            migrationBuilder.CreateTable(
                name: "UserGroup",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Deleted = table.Column<bool>(nullable: false),
                    Title = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: false),
                    Modules = table.Column<string>(nullable: false),
                    AccessLevel = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGroup", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    RoleId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderItems",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Deleted = table.Column<bool>(nullable: false),
                    StockCode = table.Column<string>(nullable: true),
                    StockDescription = table.Column<string>(nullable: true),
                    StockCost = table.Column<decimal>(nullable: false),
                    Quantity = table.Column<decimal>(nullable: false),
                    OrderId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderItems_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ItemTypes",
                schema: "dbo",
                columns: table => new
                {
                    ItemTypesId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ItemTypeGroupsId = table.Column<long>(nullable: false),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemTypes", x => x.ItemTypesId);
                    table.ForeignKey(
                        name: "ForeignKey_itemTypeGroup_ItemTypes",
                        column: x => x.ItemTypeGroupsId,
                        principalSchema: "dbo",
                        principalTable: "ItemTypeGroups",
                        principalColumn: "ItemTypeGroupsId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Site",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Deleted = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Abbr = table.Column<string>(nullable: false),
                    Address = table.Column<string>(nullable: true),
                    Latitude = table.Column<float>(nullable: false),
                    Longitude = table.Column<float>(nullable: false),
                    LocationPocoId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Site", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Site_Location_LocationPocoId",
                        column: x => x.LocationPocoId,
                        principalSchema: "dbo",
                        principalTable: "Location",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    AccessFailedCount = table.Column<int>(nullable: false),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    Id = table.Column<string>(nullable: false),
                    UserName = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
                    Email = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    DateRegistered = table.Column<DateTime>(nullable: false),
                    LastLoggedIn = table.Column<DateTime>(nullable: false),
                    EmploymentStartDate = table.Column<DateTime>(nullable: false),
                    EmploymentEndDate = table.Column<DateTime>(nullable: false),
                    GroupId = table.Column<long>(nullable: false),
                    PtmEnabled = table.Column<bool>(nullable: false),
                    Deleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUsers_UserGroup_GroupId",
                        column: x => x.GroupId,
                        principalSchema: "dbo",
                        principalTable: "UserGroup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                schema: "dbo",
                columns: table => new
                {
                    ItemsId = table.Column<long>(nullable: false),
                    ItemTypesId = table.Column<long>(nullable: false),
                    SuppliersId = table.Column<long>(nullable: false),
                    UnitPrice = table.Column<decimal>(nullable: false),
                    Metric = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.ItemsId);
                    table.ForeignKey(
                        name: "ForeignKey_item_ItemTypes",
                        column: x => x.ItemsId,
                        principalSchema: "dbo",
                        principalTable: "ItemTypes",
                        principalColumn: "ItemTypesId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "ForeignKey_item_Supplier",
                        column: x => x.SuppliersId,
                        principalSchema: "dbo",
                        principalTable: "Suppliers",
                        principalColumn: "SuppliersId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(nullable: false),
                    ProviderKey = table.Column<string>(nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    RoleId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Quotes",
                schema: "dbo",
                columns: table => new
                {
                    QuotesId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CustomersId = table.Column<long>(nullable: false),
                    SubTotal = table.Column<decimal>(nullable: false),
                    Discount = table.Column<decimal>(nullable: false),
                    VAT = table.Column<decimal>(nullable: false),
                    Total = table.Column<decimal>(nullable: false),
                    UsersId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Quotes", x => x.QuotesId);
                    table.ForeignKey(
                        name: "ForeignKey_quote_customer",
                        column: x => x.CustomersId,
                        principalSchema: "dbo",
                        principalTable: "Customers",
                        principalColumn: "CustomersId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "ForeignKey_quote_user",
                        column: x => x.UsersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TimeSheet",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Deleted = table.Column<bool>(nullable: false),
                    Code = table.Column<string>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    SpecificLocation = table.Column<string>(nullable: true),
                    DetailedPoint = table.Column<string>(nullable: true),
                    SheetStatus = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    OperatorTime = table.Column<TimeSpan>(nullable: false),
                    AssistantTime = table.Column<TimeSpan>(nullable: false),
                    OriginalQuote = table.Column<bool>(nullable: false),
                    QuoteNo = table.Column<string>(nullable: true),
                    SINumber = table.Column<string>(nullable: true),
                    UsersId = table.Column<string>(nullable: false),
                    SiteId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeSheet", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TimeSheet_Site_SiteId",
                        column: x => x.SiteId,
                        principalSchema: "dbo",
                        principalTable: "Site",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TimeSheet_AspNetUsers_UsersId",
                        column: x => x.UsersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Warehouse",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Deleted = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Warehouse", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Warehouse_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ItemInventories",
                schema: "dbo",
                columns: table => new
                {
                    ItemInventoriesId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ItemsId = table.Column<long>(nullable: false),
                    Quantity = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemInventories", x => x.ItemInventoriesId);
                    table.ForeignKey(
                        name: "ForeignKey_item_ItemInventories",
                        column: x => x.ItemsId,
                        principalSchema: "dbo",
                        principalTable: "Items",
                        principalColumn: "ItemsId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PredefinedItems",
                schema: "dbo",
                columns: table => new
                {
                    PredefinedItemsId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ItemsId = table.Column<long>(nullable: false),
                    ProductsId = table.Column<long>(nullable: false),
                    Quantity = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PredefinedItems", x => x.PredefinedItemsId);
                    table.ForeignKey(
                        name: "ForeignKey_Item_Predefined",
                        column: x => x.ItemsId,
                        principalSchema: "dbo",
                        principalTable: "Items",
                        principalColumn: "ItemsId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "ForeignKey_Product_Predefined",
                        column: x => x.ProductsId,
                        principalSchema: "dbo",
                        principalTable: "Products",
                        principalColumn: "ProductsId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuoteItems",
                schema: "dbo",
                columns: table => new
                {
                    QuoteItemsId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    QuotesId = table.Column<long>(nullable: false),
                    ItemsId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuoteItems", x => x.QuoteItemsId);
                    table.ForeignKey(
                        name: "ForeignKey_quoteitem_item",
                        column: x => x.ItemsId,
                        principalSchema: "dbo",
                        principalTable: "Items",
                        principalColumn: "ItemsId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "ForeignKey_quoteitem_quote",
                        column: x => x.QuotesId,
                        principalSchema: "dbo",
                        principalTable: "Quotes",
                        principalColumn: "QuotesId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuoteProducts",
                schema: "dbo",
                columns: table => new
                {
                    QuoteProductsId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ProductsId = table.Column<long>(nullable: false),
                    QuotesId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuoteProducts", x => x.QuoteProductsId);
                    table.ForeignKey(
                        name: "ForeignKey_quoteproduct_product",
                        column: x => x.ProductsId,
                        principalSchema: "dbo",
                        principalTable: "Products",
                        principalColumn: "ProductsId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "ForeignKey_quoteproduct_quote",
                        column: x => x.QuotesId,
                        principalSchema: "dbo",
                        principalTable: "Quotes",
                        principalColumn: "QuotesId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MaterialItem",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Deleted = table.Column<bool>(nullable: false, defaultValue: false),
                    BOM_No = table.Column<string>(nullable: true),
                    Quantity = table.Column<decimal>(type: "decimal(9, 2)", nullable: false),
                    StockDescription = table.Column<string>(nullable: false),
                    StockCode = table.Column<string>(nullable: false),
                    TimeSheetId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaterialItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MaterialItem_TimeSheet_TimeSheetId",
                        column: x => x.TimeSheetId,
                        principalSchema: "dbo",
                        principalTable: "TimeSheet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NonMaterialItem",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Deleted = table.Column<bool>(nullable: false),
                    BOM_No = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: false),
                    Metric = table.Column<string>(nullable: true),
                    TimeSheetId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NonMaterialItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NonMaterialItem_TimeSheet_TimeSheetId",
                        column: x => x.TimeSheetId,
                        principalSchema: "dbo",
                        principalTable: "TimeSheet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Inventory",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Deleted = table.Column<bool>(nullable: false),
                    WarehouseId = table.Column<long>(nullable: false),
                    MaterialId = table.Column<long>(nullable: false),
                    Quantity = table.Column<decimal>(type: "decimal(9, 2)", nullable: false),
                    DateAdded = table.Column<DateTime>(nullable: false),
                    DateModified = table.Column<DateTime>(nullable: false),
                    ModifiedBy = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inventory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Inventory_Material_MaterialId",
                        column: x => x.MaterialId,
                        principalSchema: "dbo",
                        principalTable: "Material",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Inventory_Warehouse_WarehouseId",
                        column: x => x.WarehouseId,
                        principalSchema: "dbo",
                        principalTable: "Warehouse",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_GroupId",
                table: "AspNetUsers",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OrderId",
                table: "OrderItems",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Inventory_MaterialId",
                schema: "dbo",
                table: "Inventory",
                column: "MaterialId");

            migrationBuilder.CreateIndex(
                name: "IX_Inventory_WarehouseId",
                schema: "dbo",
                table: "Inventory",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemInventories_ItemsId",
                schema: "dbo",
                table: "ItemInventories",
                column: "ItemsId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_SuppliersId",
                schema: "dbo",
                table: "Items",
                column: "SuppliersId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemTypes_ItemTypeGroupsId",
                schema: "dbo",
                table: "ItemTypes",
                column: "ItemTypeGroupsId");

            migrationBuilder.CreateIndex(
                name: "IX_MaterialItem_TimeSheetId",
                schema: "dbo",
                table: "MaterialItem",
                column: "TimeSheetId");

            migrationBuilder.CreateIndex(
                name: "IX_NonMaterialItem_TimeSheetId",
                schema: "dbo",
                table: "NonMaterialItem",
                column: "TimeSheetId");

            migrationBuilder.CreateIndex(
                name: "IX_PredefinedItems_ItemsId",
                schema: "dbo",
                table: "PredefinedItems",
                column: "ItemsId");

            migrationBuilder.CreateIndex(
                name: "IX_PredefinedItems_ProductsId",
                schema: "dbo",
                table: "PredefinedItems",
                column: "ProductsId");

            migrationBuilder.CreateIndex(
                name: "IX_QuoteItems_ItemsId",
                schema: "dbo",
                table: "QuoteItems",
                column: "ItemsId");

            migrationBuilder.CreateIndex(
                name: "IX_QuoteItems_QuotesId",
                schema: "dbo",
                table: "QuoteItems",
                column: "QuotesId");

            migrationBuilder.CreateIndex(
                name: "IX_QuoteProducts_ProductsId",
                schema: "dbo",
                table: "QuoteProducts",
                column: "ProductsId");

            migrationBuilder.CreateIndex(
                name: "IX_QuoteProducts_QuotesId",
                schema: "dbo",
                table: "QuoteProducts",
                column: "QuotesId");

            migrationBuilder.CreateIndex(
                name: "IX_Quotes_CustomersId",
                schema: "dbo",
                table: "Quotes",
                column: "CustomersId");

            migrationBuilder.CreateIndex(
                name: "IX_Quotes_UsersId",
                schema: "dbo",
                table: "Quotes",
                column: "UsersId");

            migrationBuilder.CreateIndex(
                name: "IX_Site_LocationPocoId",
                schema: "dbo",
                table: "Site",
                column: "LocationPocoId");

            migrationBuilder.CreateIndex(
                name: "IX_TimeSheet_SiteId",
                schema: "dbo",
                table: "TimeSheet",
                column: "SiteId");

            migrationBuilder.CreateIndex(
                name: "IX_TimeSheet_UsersId",
                schema: "dbo",
                table: "TimeSheet",
                column: "UsersId");

            migrationBuilder.CreateIndex(
                name: "IX_Warehouse_UserId",
                schema: "dbo",
                table: "Warehouse",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "OrderItems");

            migrationBuilder.DropTable(
                name: "Game",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Inventory",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "ItemInventories",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "LookupValue",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "MaterialItem",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Module",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "NonMaterialItem",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Player",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "PredefinedItems",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "QuoteItems",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "QuoteProducts",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Material",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Warehouse",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "TimeSheet",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Items",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Products",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Quotes",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Site",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "ItemTypes",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Suppliers",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Customers",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Location",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "ItemTypeGroups",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "UserGroup",
                schema: "dbo");
        }
    }
}
