using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Interfaces;
using WebAPI.Models;
using WebAPI.Models.DTOs;

namespace WebAPI.Services
{
    public class CompanyService : ICompanyInterface
    {
        private readonly EmployeeDBContext _dbContext;

        public CompanyService(EmployeeDBContext companyDBContext)
        {
            _dbContext = companyDBContext;
        }

        public async Task<IEnumerable<Company>> GetCompanies()
        {
            return await _dbContext.Companies.ToListAsync();
        }

        public async Task<IEnumerable<CompanyDTO>> GetCompaniesSimple()
        {
            List<Company> companies = await _dbContext.Companies.OrderBy(x => x.CompanyName).ToListAsync();
            List<CompanyDTO> companyDTOs = companies.Select(c => new CompanyDTO(c)).ToList();

            return companyDTOs;
        }

        public async Task<Company> GetCompany(int id)
        {
            return await _dbContext.Companies.FirstOrDefaultAsync(e => e.CompanyId == id);
        }

        public async Task<Company> AddCompany(Company company)
        {
            company.DateCreated = DateTime.Now;
            company.DateUpdated = DateTime.Now;
            var result = await _dbContext.Companies.AddAsync(company);
            await _dbContext.SaveChangesAsync();

            await CreateNewPayroll(result.Entity.CompanyId);
            _dbContext.SaveChanges();

            var companyWithPayroll = await GetCompany(result.Entity.CompanyId);
            return companyWithPayroll;
        }

        public async Task<Company> UpdateCompany(Company emp)
        {
            var company = await _dbContext.Companies.FirstOrDefaultAsync(e => e.CompanyId == emp.CompanyId);

            if (company == null)
            {
                return null;
            }

            company.CompanyName = emp.CompanyName;
            company.DateUpdated = DateTime.Now;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return null;
            }

            return company;
        }

        public async Task<Company> DeleteCompany(int id)
        {
            var company = await _dbContext.Companies.FindAsync(id);

            try
            {
                _dbContext.Remove(company);
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!CompanyExists(id))
            {
                return null;
            }
            return company;
        }
        private bool CompanyExists(int id)
        {
            return _dbContext.Companies.Any(e => e.CompanyId == id);
        }

        #region Payroll
        public async Task<IEnumerable<Payroll>> GetAllPayroll(int id)
        {
            List<Payroll> payrolls = await _dbContext.Payrolls.Where(p => p.CompanyId == id).OrderByDescending(pr => pr.PayrollId).ToListAsync();
            return payrolls;
        }

        public async Task<Payroll> CreateNewPayroll(int companyId)
        {
            Payroll latestPayroll = _dbContext.Payrolls.Where(p => p.CompanyId == companyId).OrderByDescending(d => d.PayrollId).FirstOrDefault();
            Payroll payroll = new Payroll();
            payroll.CompanyId = companyId;
            payroll.CreatedDate = DateTime.Now;

            if (latestPayroll == null)
            {
                payroll.StartDate = DateTime.Now.Date;
                payroll.EndDate = payroll.StartDate.Value.AddDays(13);
            }
            else
            {
                payroll.StartDate = latestPayroll.EndDate.Value.AddDays(1);
                payroll.EndDate = payroll.StartDate.Value.AddDays(13);
            }
            var result = await _dbContext.Payrolls.AddAsync(payroll);
            await _dbContext.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<bool> CompanyNameExists(Company company)
        {
            return await _dbContext.Companies.AnyAsync(e => e.CompanyName == company.CompanyName);
        }
        #endregion
    }
}
