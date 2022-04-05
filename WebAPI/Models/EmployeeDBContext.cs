using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace WebAPI.Models
{
    public partial class EmployeeDBContext : DbContext
    {
        public EmployeeDBContext()
        {
        }

        public EmployeeDBContext(DbContextOptions<EmployeeDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<Deduction> Deductions { get; set; }
        public virtual DbSet<Dependent> Dependents { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<Paycheck> Paychecks { get; set; }
        public virtual DbSet<Payroll> Payrolls { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=.\\;Database=EmployeeDB;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Company>(entity =>
            {
                entity.HasKey(e => e.CompanyId);
            });

            modelBuilder.Entity<Deduction>(entity =>
            {
                entity.HasKey(e => e.DeductionId)
                    .HasName("PK__Deductio__E2604C5749F010BF");

                entity.HasIndex(e => e.PaycheckId);

                entity.Property(e => e.Cost).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Discount).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Paycheck)
                    .WithMany(p => p.Deductions)
                    .HasForeignKey(d => d.PaycheckId)
                    .HasConstraintName("FK_Deductions_Paychecks");
            });

            modelBuilder.Entity<Dependent>(entity =>
            {
                entity.HasKey(e => e.DependentId)
                    .HasName("PK__Dependen__9BC67CF1B2EA84BA");

                entity.HasIndex(e => e.EmployeeId);

                entity.Property(e => e.DateCreated).HasColumnType("date");

                entity.Property(e => e.DateUpdated).HasColumnType("date");

                entity.Property(e => e.DependentFirstName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.DependentLastName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.DependentSsn)
                    .HasColumnName("DependentSSN")
                    .HasMaxLength(9)
                    .IsUnicode(false);

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.Dependents)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK__Dependent__Emplo__534D60F1");
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.EmployeeId)
                    .HasName("PK__Employee__7AD04F113516F170");

                entity.HasIndex(e => e.CompanyId);

                entity.Property(e => e.DateCreated).HasColumnType("date");

                entity.Property(e => e.DateUpdated).HasColumnType("date");

                entity.Property(e => e.EmployeeFirstName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.EmployeeLastName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.EmployeeSsn)
                    .HasColumnName("EmployeeSSN")
                    .HasMaxLength(9)
                    .IsUnicode(false);

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(d => d.CompanyId);
            });

            modelBuilder.Entity<Paycheck>(entity =>
            {
                entity.HasKey(e => e.PaycheckId)
                    .HasName("PK__Paycheck__E1043DFE65C7B3C5");

                entity.HasIndex(e => e.EmployeeId);

                entity.Property(e => e.DeductionsTotal).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.GrossPay).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.NetPay).HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.Paychecks)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK_Paycheck_Employees");
            });

            modelBuilder.Entity<Payroll>(entity =>
            {
                entity.HasKey(e => e.PayrollId);

                entity.HasIndex(e => e.CompanyId);

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.Payrolls)
                    .HasForeignKey(d => d.CompanyId);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
