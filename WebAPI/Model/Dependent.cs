using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace WebAPI.Model
{
    public partial class Dependent
    {
        public int DependentId { get; set; }
        public int EmployeeId { get; set; }
        public string DependentFirstName { get; set; }
        public string DependentLastName { get; set; }
        public string DependentSSN { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public virtual Employee Employee { get; set; }
    }
}
