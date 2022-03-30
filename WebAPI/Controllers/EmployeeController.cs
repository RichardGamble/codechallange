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

    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeDBContext _dbContext;

        public EmployeeController(EmployeeDBContext employeeDBContext)
        {
            _dbContext = employeeDBContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            return await _dbContext.Employees.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _dbContext.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        [HttpPost]
        public async Task<ActionResult<Employee>> CreateEmployee(Employee emp)
        {
            var employee = new Employee
            {
                EmployeeFirstName = emp.EmployeeFirstName,
                EmployeeLastName = emp.EmployeeLastName,
                DateCreated = DateTime.Now,
                DateUpdated = DateTime.Now,
                DateOfBirth = emp.DateOfBirth,
                EmployeeSsn = emp.EmployeeSsn,
                IsTerminated = emp.IsTerminated
            };

            _dbContext.Employees.Add(employee);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetEmployee),
                new { id = employee.EmployeeId },
                employee);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, Employee emp)
        {
            if (id != emp.EmployeeId)
            {
                return BadRequest();
            }

            var employee = await _dbContext.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            employee.EmployeeFirstName = emp.EmployeeFirstName;
            employee.EmployeeLastName = emp.EmployeeLastName;
            employee.DateUpdated = DateTime.Now;
            employee.EmployeeSsn = emp.EmployeeSsn;
            employee.DateOfBirth = emp.DateOfBirth;
            employee.IsTerminated = emp.IsTerminated;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!EmployeeExists(id))
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public JsonResult DeleteEmployee([FromRoute] int id)
        {
            Employee Employees = _dbContext.Employees.Where(e => e.EmployeeId == id).FirstOrDefault();
            _dbContext.Remove(Employees);
            _dbContext.SaveChanges();

            return new JsonResult("Employee deleted successfully");
        }
        private bool EmployeeExists(int id)
        {
            return _dbContext.Employees.Any(e => e.EmployeeId == id);
        }
    }
}