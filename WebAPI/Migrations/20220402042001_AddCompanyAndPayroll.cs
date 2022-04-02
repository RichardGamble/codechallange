using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class AddCompanyAndPayroll : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsEmployee",
                table: "Deductions");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "Paychecks",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "Paychecks");

            migrationBuilder.AddColumn<bool>(
                name: "IsEmployee",
                table: "Deductions",
                type: "bit",
                nullable: true);
        }
    }
}
