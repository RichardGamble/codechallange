using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public partial class Company
    {
        public Company()
        {
            Payrolls = new HashSet<Payroll>();
            Employees = new HashSet<Employee>();
        }

        [Key]
        public int CompnayId { get; set; }
        public string CompanyName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public virtual ICollection<Employee> Employees{ get; set; }
        public virtual ICollection<Payroll> Payrolls { get; set; }
    }
}

