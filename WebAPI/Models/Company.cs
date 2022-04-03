using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models.DTOs;

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
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }
        public virtual ICollection<Employee> Employees{ get; set; }
        public virtual ICollection<Payroll> Payrolls { get; set; }       
    }
}

