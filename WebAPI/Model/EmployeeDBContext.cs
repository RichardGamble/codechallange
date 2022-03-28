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

        public virtual DbSet<Dependent> Dependents { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("name=EmployeeAppConnection");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
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

                entity.Property(e => e.DependentSSN)
                    .HasColumnName("DependentSSN")
                    .HasMaxLength(9)
                    .IsUnicode(false);

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.Dependents)
                    .HasForeignKey(d => d.EmployeeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Dependent__Emplo__534D60F1");

                entity.HasData(
                   new Dependent
                   {
                       DependentId = 1,
                       EmployeeId = 1,
                       DependentSSN = "222222222",
                       DependentFirstName = "Evelyn",
                       DependentLastName = "Abbott",
                       DateCreated = DateTime.Now,
                       DateUpdated = DateTime.Now,
                       DateOfBirth = new DateTime(1974, 10, 12)
                   },
                    new Dependent
                    {
                        DependentId = 2,
                        EmployeeId = 1,
                        DependentSSN = "777777777",
                        DependentFirstName = "Noah",
                        DependentLastName = "Abbott",
                        DateCreated = DateTime.Now,
                        DateUpdated = DateTime.Now,
                        DateOfBirth = new DateTime(2010, 9, 12)
                    },
                    new Dependent
                    {
                        DependentId = 3,
                        EmployeeId = 2,
                        DependentSSN = "333333333",
                        DependentFirstName = "Maria",
                        DependentLastName = "Trapp",
                        DateCreated = DateTime.Now,
                        DateUpdated = DateTime.Now,
                        DateOfBirth = new DateTime(1914, 2, 20)
                    });
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

                entity.Property(e => e.EmployeeSSN)
                    .HasColumnName("EmployeeSSN")
                    .HasMaxLength(9)
                    .IsUnicode(false);
                entity.HasData(
                    new Employee
                    {
                        EmployeeId = 1,
                        EmployeeSSN = "999999999",
                        EmployeeFirstName = "Lee",
                        EmployeeLastName = "Abbott",
                        DateCreated = DateTime.Now,
                        DateUpdated = DateTime.Now,
                        IsTerminated = false
                    },
                    new Employee
                    {
                        EmployeeId = 2,
                        EmployeeSSN = "555555555",
                        EmployeeFirstName = "Georg",
                        EmployeeLastName = "Trapp",
                        DateCreated = DateTime.Now,
                        DateUpdated = DateTime.Now,
                        IsTerminated = false,
                    }

                );
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
