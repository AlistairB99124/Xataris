using Microsoft.EntityFrameworkCore.Migrations;

namespace Xataris.DBService.Migrations
{
    public partial class Restart2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "ForeignKey_quote_customer",
                schema: "dbo",
                table: "Quotes");

            migrationBuilder.AlterColumn<long>(
                name: "CustomersId",
                schema: "dbo",
                table: "Quotes",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AddColumn<string>(
                name: "Customer",
                schema: "dbo",
                table: "Quotes",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Quotes_Customers_CustomersId",
                schema: "dbo",
                table: "Quotes",
                column: "CustomersId",
                principalSchema: "dbo",
                principalTable: "Customers",
                principalColumn: "CustomersId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Quotes_Customers_CustomersId",
                schema: "dbo",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "Customer",
                schema: "dbo",
                table: "Quotes");

            migrationBuilder.AlterColumn<long>(
                name: "CustomersId",
                schema: "dbo",
                table: "Quotes",
                nullable: false,
                oldClrType: typeof(long),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "ForeignKey_quote_customer",
                schema: "dbo",
                table: "Quotes",
                column: "CustomersId",
                principalSchema: "dbo",
                principalTable: "Customers",
                principalColumn: "CustomersId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
