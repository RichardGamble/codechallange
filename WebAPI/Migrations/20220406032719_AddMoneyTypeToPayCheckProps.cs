using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class AddMoneyTypeToPayCheckProps : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Paychecks_Payrolls_PayrollId",
                table: "Paychecks");

            migrationBuilder.AddForeignKey(
                name: "FK_Paychecks_Payrolls_PayrollId",
                table: "Paychecks",
                column: "PayrollId",
                principalTable: "Payrolls",
                principalColumn: "PayrollId",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Paychecks_Payrolls_PayrollId",
                table: "Paychecks");

            migrationBuilder.AddForeignKey(
                name: "FK_Paychecks_Payrolls_PayrollId",
                table: "Paychecks",
                column: "PayrollId",
                principalTable: "Payrolls",
                principalColumn: "PayrollId");
        }
    }
}
