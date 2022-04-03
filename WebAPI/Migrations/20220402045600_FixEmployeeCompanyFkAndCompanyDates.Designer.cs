﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebAPI.Models;

namespace WebAPI.Migrations
{
    [DbContext(typeof(EmployeeDBContext))]
    [Migration("20220402045600_FixEmployeeCompanyFkAndCompanyDates")]
    partial class FixEmployeeCompanyFkAndCompanyDates
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.23")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebAPI.Models.Company", b =>
                {
                    b.Property<int>("CompanyId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CompanyName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("DateCreated")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DateUpdated")
                        .HasColumnType("datetime2");

                    b.HasKey("CompanyId");

                    b.ToTable("Companies");
                });

            modelBuilder.Entity("WebAPI.Models.Deduction", b =>
                {
                    b.Property<int>("DeductionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal?>("Cost")
                        .HasColumnType("numeric(18, 0)");

                    b.Property<decimal?>("Discount")
                        .HasColumnType("numeric(18, 0)");

                    b.Property<string>("Name")
                        .HasColumnType("varchar(50)")
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.Property<int>("PaycheckId")
                        .HasColumnType("int");

                    b.HasKey("DeductionId")
                        .HasName("PK__Deductio__E2604C5749F010BF");

                    b.HasIndex("PaycheckId");

                    b.ToTable("Deductions");
                });

            modelBuilder.Entity("WebAPI.Models.Dependent", b =>
                {
                    b.Property<int>("DependentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("DateCreated")
                        .HasColumnType("date");

                    b.Property<DateTime?>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DateUpdated")
                        .HasColumnType("date");

                    b.Property<string>("DependentFirstName")
                        .HasColumnType("varchar(30)")
                        .HasMaxLength(30)
                        .IsUnicode(false);

                    b.Property<string>("DependentLastName")
                        .HasColumnType("varchar(30)")
                        .HasMaxLength(30)
                        .IsUnicode(false);

                    b.Property<string>("DependentSsn")
                        .HasColumnName("DependentSSN")
                        .HasColumnType("varchar(9)")
                        .HasMaxLength(9)
                        .IsUnicode(false);

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.HasKey("DependentId")
                        .HasName("PK__Dependen__9BC67CF1B2EA84BA");

                    b.HasIndex("EmployeeId");

                    b.ToTable("Dependents");
                });

            modelBuilder.Entity("WebAPI.Models.Employee", b =>
                {
                    b.Property<int>("EmployeeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CompanyId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("DateCreated")
                        .HasColumnType("date");

                    b.Property<DateTime?>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DateUpdated")
                        .HasColumnType("date");

                    b.Property<string>("EmployeeFirstName")
                        .HasColumnType("varchar(30)")
                        .HasMaxLength(30)
                        .IsUnicode(false);

                    b.Property<string>("EmployeeLastName")
                        .HasColumnType("varchar(30)")
                        .HasMaxLength(30)
                        .IsUnicode(false);

                    b.Property<string>("EmployeeSsn")
                        .HasColumnName("EmployeeSSN")
                        .HasColumnType("varchar(9)")
                        .HasMaxLength(9)
                        .IsUnicode(false);

                    b.Property<bool?>("IsTerminated")
                        .HasColumnType("bit");

                    b.HasKey("EmployeeId")
                        .HasName("PK__Employee__7AD04F113516F170");

                    b.HasIndex("CompanyId");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("WebAPI.Models.Paycheck", b =>
                {
                    b.Property<int>("PaycheckId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<decimal?>("DeductionsTotal")
                        .HasColumnType("numeric(18, 0)");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<decimal?>("GrossPay")
                        .HasColumnType("numeric(18, 0)");

                    b.Property<decimal?>("NetPay")
                        .HasColumnType("numeric(18, 0)");

                    b.HasKey("PaycheckId")
                        .HasName("PK__Paycheck__E1043DFE65C7B3C5");

                    b.HasIndex("EmployeeId");

                    b.ToTable("Paychecks");
                });

            modelBuilder.Entity("WebAPI.Models.Payroll", b =>
                {
                    b.Property<int>("PayrollId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CompanyId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("PayPeriod")
                        .HasColumnType("int");

                    b.Property<DateTime?>("StartDate")
                        .HasColumnType("datetime2");

                    b.HasKey("PayrollId");

                    b.HasIndex("CompanyId");

                    b.ToTable("Payrolls");
                });

            modelBuilder.Entity("WebAPI.Models.Deduction", b =>
                {
                    b.HasOne("WebAPI.Models.Paycheck", "Paycheck")
                        .WithMany("Deductions")
                        .HasForeignKey("PaycheckId")
                        .HasConstraintName("FK_Deductions_Paychecks")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("WebAPI.Models.Dependent", b =>
                {
                    b.HasOne("WebAPI.Models.Employee", "Employee")
                        .WithMany("Dependents")
                        .HasForeignKey("EmployeeId")
                        .HasConstraintName("FK__Dependent__Emplo__534D60F1")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("WebAPI.Models.Employee", b =>
                {
                    b.HasOne("WebAPI.Models.Company", "Company")
                        .WithMany("Employees")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("WebAPI.Models.Paycheck", b =>
                {
                    b.HasOne("WebAPI.Models.Employee", "Employee")
                        .WithMany("Paychecks")
                        .HasForeignKey("EmployeeId")
                        .HasConstraintName("FK_Paycheck_Employees")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("WebAPI.Models.Payroll", b =>
                {
                    b.HasOne("WebAPI.Models.Company", "Company")
                        .WithMany("Payrolls")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
