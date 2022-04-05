using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace WebAPI.Models
{
    public partial class Paycheck
    {
        public Paycheck()
        {
            Deductions = new HashSet<Deduction>();
        }

        public int PaycheckId { get; set; }
        public int EmployeeId { get; set; }
        public decimal? GrossPay { get; set; }
        public decimal? DeductionsTotal { get; set; }
        public decimal? NetPay { get; set; }
        public DateTime? CreatedDate { get; set; }

        public virtual Employee Employee { get; set; }
        public virtual ICollection<Deduction> Deductions { get; set; }
    }
}
