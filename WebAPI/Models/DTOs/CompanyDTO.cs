using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models.DTOs
{
    public class CompanyDTO
    {
        public CompanyDTO()
        {
        }

        public CompanyDTO(Company company)
        {
            CompanyId = company.CompanyId;
            CompanyName = company.CompanyName;
        }
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }        
    }
}

