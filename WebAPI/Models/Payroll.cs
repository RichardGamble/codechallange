using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public partial class Payroll
    {
        [Key]
        public int PayrollId { get; set; }
        public int CompanyId { get; set; }
        public int PayPeriod { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public virtual Company Company { get; set; }
    }
}
