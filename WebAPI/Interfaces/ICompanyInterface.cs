using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;
using WebAPI.Models.DTOs;

namespace WebAPI.Interfaces
{
    public interface ICompanyInterface
    {
        public Task<IEnumerable<Company>> GetCompanies();
        public Task<Company> GetCompany(int id);
        public Task<Company> UpdateCompany(Company emp);
        public Task<Company> DeleteCompany([FromRoute] int id);
        public Task<Company> AddCompany(Company employee);
        public Task<IEnumerable<CompanyDTO>> GetCompaniesSimple();
        public Task<IEnumerable<Payroll>> GetAllPayroll(int id);
        public Task<Payroll> CreateNewPayroll(int id);
        public Task<bool> CompanyNameExists(Company company);
    }
}
