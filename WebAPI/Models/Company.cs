using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace WebAPI.Models
{
    public partial class Company
    {
        public Company()
        {
            Employees = new HashSet<Employee>();
            Payrolls = new HashSet<Payroll>();
        }

        public string CompanyName { get; set; }
        public int CompanyId { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }
        public virtual ICollection<Payroll> Payrolls { get; set; }
    }
}
