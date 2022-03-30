using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace WebAPI.Model
{
    public partial class Dependent
    {
        public long DependentId { get; set; }
        public long EmployeeId { get; set; }
        public string DependentFirstName { get; set; }
        public string DependentLastName { get; set; }
        public string DependentSsn { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }
        public DateTime? DateOfBirth { get; set; }

        public virtual Employee Employee { get; set; }
    }
}
