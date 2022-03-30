using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace WebAPI.Model
{
    public partial class Deduction
    {
        public long DeductionId { get; set; }
        public long PaycheckId { get; set; }
        public bool? IsEmployee { get; set; }
        public decimal? Discount { get; set; }
        public string Name { get; set; }
        public decimal? Cost { get; set; }

        public virtual Paycheck Paycheck { get; set; }
    }
}
