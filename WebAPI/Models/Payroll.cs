using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace WebAPI.Models
{
    public partial class Payroll
    {
        public Payroll()
        {
            Paychecks = new HashSet<Paycheck>();
        }
        public int PayrollId { get; set; }
        public int CompanyId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public virtual Company Company { get; set; }
        public virtual ICollection<Paycheck> Paychecks { get; set; }

    }
}
