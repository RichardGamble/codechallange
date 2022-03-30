using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace WebAPI.Model
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

        public virtual DbSet<Deduction> Deductions { get; set; }
        public virtual DbSet<Dependent> Dependents { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<Paycheck> Paychecks { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=.\\;Database=EmployeeDB;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Deduction>(entity =>
            {
                entity.HasKey(e => e.DeductionId)
                    .HasName("PK__Deductio__E2604C578041F446");

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

                entity.Property(e => e.DateCreated).HasColumnType("date");

                entity.Property(e => e.DateUpdated).HasColumnType("date");

                entity.Property(e => e.EmployeeFirstName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.EmployeeLastName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.EmployeeSsn)
                    .HasColumnName("EmployeeSsn")
                    .HasMaxLength(9)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Paycheck>(entity =>
            {
                entity.HasKey(e => e.PaycheckId)
                    .HasName("PK__Paycheck__E1043DFECDFB1A45");

                entity.Property(e => e.DeductionsTotal).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.GrossPay).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.NetPay).HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.Paychecks)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK_Paycheck_Employees");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
