using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class FirstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    EmployeeId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeFirstName = table.Column<string>(unicode: false, maxLength: 30, nullable: true),
                    EmployeeLastName = table.Column<string>(unicode: false, maxLength: 30, nullable: true),
                    EmployeeSsn = table.Column<string>(unicode: false, maxLength: 9, nullable: true),
                    DateCreated = table.Column<DateTime>(type: "date", nullable: true),
                    DateUpdated = table.Column<DateTime>(type: "date", nullable: true),
                    DateOfBirth = table.Column<DateTime>(nullable: true),
                    IsTerminated = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Employee__7AD04F113516F170", x => x.EmployeeId);
                });

            migrationBuilder.CreateTable(
                name: "Dependents",
                columns: table => new
                {
                    DependentId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<long>(nullable: false),
                    DependentFirstName = table.Column<string>(unicode: false, maxLength: 30, nullable: true),
                    DependentLastName = table.Column<string>(unicode: false, maxLength: 30, nullable: true),
                    DependentSSN = table.Column<string>(unicode: false, maxLength: 9, nullable: true),
                    DateCreated = table.Column<DateTime>(type: "date", nullable: true),
                    DateUpdated = table.Column<DateTime>(type: "date", nullable: true),
                    DateOfBirth = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Dependen__9BC67CF1B2EA84BA", x => x.DependentId);
                    table.ForeignKey(
                        name: "FK__Dependent__Emplo__534D60F1",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "EmployeeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Paychecks",
                columns: table => new
                {
                    PaycheckId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<long>(nullable: false),
                    GrossPay = table.Column<decimal>(type: "numeric(18, 0)", nullable: true),
                    DeductionsTotal = table.Column<decimal>(type: "numeric(18, 0)", nullable: true),
                    NetPay = table.Column<decimal>(type: "numeric(18, 0)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Paycheck__E1043DFECDFB1A45", x => x.PaycheckId);
                    table.ForeignKey(
                        name: "FK_Paycheck_Employees",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "EmployeeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Deductions",
                columns: table => new
                {
                    DeductionId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PaycheckId = table.Column<long>(nullable: false),
                    IsEmployee = table.Column<bool>(nullable: true),
                    Discount = table.Column<decimal>(type: "numeric(18, 0)", nullable: true),
                    Name = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    Cost = table.Column<decimal>(type: "numeric(18, 0)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Deductio__E2604C578041F446", x => x.DeductionId);
                    table.ForeignKey(
                        name: "FK_Deductions_Paychecks",
                        column: x => x.PaycheckId,
                        principalTable: "Paychecks",
                        principalColumn: "PaycheckId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Deductions_PaycheckId",
                table: "Deductions",
                column: "PaycheckId");

            migrationBuilder.CreateIndex(
                name: "IX_Dependents_EmployeeId",
                table: "Dependents",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Paychecks_EmployeeId",
                table: "Paychecks",
                column: "EmployeeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Deductions");

            migrationBuilder.DropTable(
                name: "Dependents");

            migrationBuilder.DropTable(
                name: "Paychecks");

            migrationBuilder.DropTable(
                name: "Employees");
        }
    }
}
