using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeDBContext _dbContext;
        private readonly IEmployeeInterface _employeeInterface;

        public EmployeeController(EmployeeDBContext employeeDBContext, IEmployeeInterface employeeInterface)
        {
            _dbContext = employeeDBContext;
            _employeeInterface = employeeInterface;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            var employees = await _employeeInterface.GetEmployees();
            if (employees == null)
            {
                return NotFound();
            }

            return Ok(employees);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _employeeInterface.GetEmployee(id);

            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        [HttpPost]
        public async Task<ActionResult<Employee>> CreateEmployee(Employee employee)
        {
            if (employee == null)
            {
                return BadRequest();
            }

            var createdEmployee = await _employeeInterface.AddEmployee(employee);

            return CreatedAtAction(nameof(GetEmployee), 
                new { id = createdEmployee.EmployeeId },
                createdEmployee);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<Employee>> UpdateEmployee(int id, Employee employee)
        {
            if (id != employee.EmployeeId)
            {
                return BadRequest("Employee ID mismatch"); ;
            }

            var employeeToUpdate = await _employeeInterface.GetEmployee(id);

            if (employeeToUpdate == null)
            {
                return NotFound($"Employee with Id = {id} not found");
            }

            return await _employeeInterface.UpdateEmployee(employee);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Employee>> DeleteEmployee(int id)
        {
            var employeeToDelete = await _employeeInterface.GetEmployee(id);

            if (employeeToDelete == null)
            {
                return NotFound($"Employee with Id = {id} not found");
            }
            else
            {
                return await _employeeInterface.DeleteEmployee(id);
            };

        }

    }
}