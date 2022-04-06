using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class AddPaycheckToPayroll : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PayPeriod",
                table: "Payrolls");

            migrationBuilder.AddColumn<int>(
                name: "PayrollId",
                table: "Paychecks",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Paychecks_PayrollId",
                table: "Paychecks",
                column: "PayrollId");

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

            migrationBuilder.DropIndex(
                name: "IX_Paychecks_PayrollId",
                table: "Paychecks");

            migrationBuilder.DropColumn(
                name: "PayrollId",
                table: "Paychecks");

            migrationBuilder.AddColumn<int>(
                name: "PayPeriod",
                table: "Payrolls",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
