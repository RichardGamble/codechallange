using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Model;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class DependentController : ControllerBase
    {
        private readonly EmployeeDBContext _dbContext;

        public DependentController(EmployeeDBContext employeeDBContext)
        {
            _dbContext = employeeDBContext;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Dependent>>> GetDependents(int id)
        {
            var dependents = await _dbContext.Dependents.Where(d => d.EmployeeId == id).ToListAsync();

            if (dependents == null)
            {
                return NotFound();
            }

            return dependents;
        }

        [HttpPost]
        public JsonResult Post([FromBody] Dependent dep)
        {
            Dependent dependent = new Dependent();
            dependent.DependentFirstName = dep.DependentFirstName;
            _dbContext.Dependents.Add(dependent);
            _dbContext.SaveChanges();

            return new JsonResult("Dependent added successfully");
        }

        [HttpPut]
        public JsonResult Put([FromBody] Dependent dep)
        {
            Dependent dependent = _dbContext.Dependents.Where(d => d.DependentId == dep.EmployeeId).FirstOrDefault();
            dependent.DependentFirstName = dep.DependentFirstName;
            _dbContext.SaveChanges();

            return new JsonResult("Department updated successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete([FromRoute] int id)
        {
            Dependent dependent = _dbContext.Dependents.Where(d => d.DependentId == id).FirstOrDefault();
            _dbContext.Remove(dependent);
            _dbContext.SaveChanges();

            return new JsonResult("Dependents deleted successfully");
        }

    }
}