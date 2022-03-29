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
        public JsonResult Get()
        {
            var Employees = _dbContext.Employees.ToList();

            return new JsonResult(Employees);
        }

        [HttpPost]
        public JsonResult Post([FromBody] Employee emp)
        {
            Employee employee = new Employee();
            employee = emp;
            employee.EmployeeId = 0;
            employee.DateCreated = DateTime.Now;
            employee.DateUpdated = DateTime.Now;
            _dbContext.Employees.Add(employee);
            _dbContext.SaveChanges();

            return new JsonResult("Employee added successfully");
        }

        [HttpPut]
        public JsonResult Put([FromBody] Employee emp)
        {
            Employee employee = _dbContext.Employees.Where(e => e.EmployeeId == emp.EmployeeId).FirstOrDefault();
            employee.EmployeeFirstName = emp.EmployeeFirstName;
            _dbContext.SaveChanges();

            return new JsonResult("Employee updated successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete([FromRoute] int id)
        {
            Employee Employees = _dbContext.Employees.Where(e => e.EmployeeId == id).FirstOrDefault();
            _dbContext.Remove(Employees);
            _dbContext.SaveChanges();

            return new JsonResult("Employee deleted successfully");
        }

    }
}