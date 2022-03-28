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
                    EmployeeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeFirstName = table.Column<string>(unicode: false, maxLength: 30, nullable: true),
                    EmployeeLastName = table.Column<string>(unicode: false, maxLength: 30, nullable: true),
                    EmployeeSSN = table.Column<string>(unicode: false, maxLength: 9, nullable: true),
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
                    DependentId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<int>(nullable: false),
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
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Employees",
                columns: new[] { "EmployeeId", "DateCreated", "DateOfBirth", "DateUpdated", "EmployeeFirstName", "EmployeeLastName", "EmployeeSSN", "IsTerminated" },
                values: new object[] { 1, new DateTime(2022, 3, 26, 22, 23, 24, 36, DateTimeKind.Local).AddTicks(8992), null, new DateTime(2022, 3, 26, 22, 23, 24, 36, DateTimeKind.Local).AddTicks(9356), "Lee", "Abbott", "999999999", false });

            migrationBuilder.InsertData(
                table: "Employees",
                columns: new[] { "EmployeeId", "DateCreated", "DateOfBirth", "DateUpdated", "EmployeeFirstName", "EmployeeLastName", "EmployeeSSN", "IsTerminated" },
                values: new object[] { 2, new DateTime(2022, 3, 26, 22, 23, 24, 36, DateTimeKind.Local).AddTicks(9999), null, new DateTime(2022, 3, 26, 22, 23, 24, 37, DateTimeKind.Local).AddTicks(25), "Georg", "Trapp", "555555555", false });

            migrationBuilder.InsertData(
                table: "Dependents",
                columns: new[] { "DependentId", "DateCreated", "DateOfBirth", "DateUpdated", "DependentFirstName", "DependentLastName", "DependentSSN", "EmployeeId" },
                values: new object[] { 1, new DateTime(2022, 3, 26, 22, 23, 24, 30, DateTimeKind.Local).AddTicks(8357), new DateTime(1974, 10, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2022, 3, 26, 22, 23, 24, 34, DateTimeKind.Local).AddTicks(4250), "Evelyn", "Abbott", "222222222", 1 });

            migrationBuilder.InsertData(
                table: "Dependents",
                columns: new[] { "DependentId", "DateCreated", "DateOfBirth", "DateUpdated", "DependentFirstName", "DependentLastName", "DependentSSN", "EmployeeId" },
                values: new object[] { 2, new DateTime(2022, 3, 26, 22, 23, 24, 34, DateTimeKind.Local).AddTicks(5045), new DateTime(2010, 9, 12, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2022, 3, 26, 22, 23, 24, 34, DateTimeKind.Local).AddTicks(5065), "Noah", "Abbott", "777777777", 1 });

            migrationBuilder.InsertData(
                table: "Dependents",
                columns: new[] { "DependentId", "DateCreated", "DateOfBirth", "DateUpdated", "DependentFirstName", "DependentLastName", "DependentSSN", "EmployeeId" },
                values: new object[] { 3, new DateTime(2022, 3, 26, 22, 23, 24, 34, DateTimeKind.Local).AddTicks(5088), new DateTime(1914, 2, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2022, 3, 26, 22, 23, 24, 34, DateTimeKind.Local).AddTicks(5091), "Maria", "Trapp", "333333333", 2 });

            migrationBuilder.CreateIndex(
                name: "IX_Dependents_EmployeeId",
                table: "Dependents",
                column: "EmployeeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Dependents");

            migrationBuilder.DropTable(
                name: "Employees");
        }
    }
}
