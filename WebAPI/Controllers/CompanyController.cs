using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Interfaces;
using WebAPI.Models;
using WebAPI.Models.DTOs;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class CompanyController : ControllerBase
    {
        private readonly EmployeeDBContext _dbContext;
        private readonly ICompanyInterface _companyInterface;

        public CompanyController(EmployeeDBContext companyDBContext, ICompanyInterface companyInterface)
        {
            _dbContext = companyDBContext;
            _companyInterface = companyInterface;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompanies()
        {
            var companys = await _companyInterface.GetCompanies();
            if (companys == null)
            {
                return NotFound();
            }

            return Ok(companys);
        }

        [HttpGet("simple")]
        public async Task<ActionResult<IEnumerable<CompanyDTO>>> GetCompaniesDto()
        {
            var companys = await _companyInterface.GetCompaniesSimple();
            if (companys == null)
            {
                return NotFound();
            }

            return Ok(companys);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Company>> GetCompany(int id)
        {
            var company = await _companyInterface.GetCompany(id);

            if (company == null)
            {
                return NotFound();
            }

            return Ok(company);
        }

        [HttpPost]
        public async Task<ActionResult<Company>> CreateCompany(Company company)
        {
            if (company == null)
            {
                return BadRequest();
            }

            var createdCompany = await _companyInterface.AddCompany(company);

            return CreatedAtAction(nameof(GetCompany), 
                new { id = createdCompany.CompanyId },
                createdCompany);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<Company>> UpdateCompany(int id, Company company)
        {
            if (id != company.CompanyId)
            {
                return BadRequest("Company ID mismatch"); ;
            }

            var companyToUpdate = await _companyInterface.GetCompany(id);

            if (companyToUpdate == null)
            {
                return NotFound($"Company with Id = {id} not found");
            }

            return await _companyInterface.UpdateCompany(company);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Company>> DeleteCompany(int id)
        {
            var companyToDelete = await _companyInterface.GetCompany(id);

            if (companyToDelete == null)
            {
                return NotFound($"Company with Id = {id} not found");
            }
            else
            {
                return await _companyInterface.DeleteCompany(id);
            };

        }

    }
}