using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class DependentController : ControllerBase
    {
        private readonly EmployeeDBContext _dbContext;
        private readonly IDependentInterface _dependentInterface;

        public DependentController(EmployeeDBContext employeeDBContext, IDependentInterface employeeInterface)
        {
            _dbContext = employeeDBContext;
            _dependentInterface = employeeInterface;
        }

        [HttpGet("all/{empid:int}")]
        public async Task<ActionResult<IEnumerable<Dependent>>> GetDependents(int empid)
        {
            var dependents = await _dependentInterface.GetDependents(empid);

            if (dependents == null)
            {
                return NotFound();
            }

            return Ok(dependents);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<IEnumerable<Dependent>>> GetDependent(int id)
        {
            var dependent = await _dependentInterface.GetDependents(id);

            if (dependent == null)
            {
                return NotFound();
            }

            return Ok(dependent);
        }

        [HttpPost]
        public async Task<ActionResult<Dependent>> CreateDependent(Dependent dependent)
        {
            if (dependent == null)
            {
                return BadRequest();
            }

            var createdDependent = await _dependentInterface.AddDependent(dependent);

            return CreatedAtAction(nameof(GetDependent),
                new { id = createdDependent.EmployeeId },
                createdDependent);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<Dependent>> UpdateDependent(int id, Dependent dependent)
        {
            if (id != dependent.DependentId)
            {
                return BadRequest("Dependent ID mismatch"); ;
            }

            var dependentToUpdate = await _dependentInterface.GetDependent(id);

            if (dependentToUpdate == null)
            {
                return NotFound($"Dependent with Id = {id} not found");
            }

            return await _dependentInterface.UpdateDependent(dependent);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Dependent>> DeleteDependent(int id)
        {
            var dependentToDelete = await _dependentInterface.GetDependent(id);

            if (dependentToDelete == null)
            {
                return NotFound($"Dependent with Id = {id} not found");
            }
            else
            {
                return await _dependentInterface.DeleteDependent(id);
            };
        }

    }
}