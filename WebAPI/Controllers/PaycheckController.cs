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
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class PaycheckController : ControllerBase
    {
        private readonly EmployeeDBContext _dbContext;
        private readonly IPaycheckInterface _paycheckInterface;

        public PaycheckController(EmployeeDBContext employeeDBContext, IPaycheckInterface paycheckInterface)
        {
            _dbContext = employeeDBContext;
            _paycheckInterface = paycheckInterface;
        }

        [HttpGet("all/{empid:int}")]
        public async Task<ActionResult<IEnumerable<Paycheck>>> GetPaychecks(int empid)
        {
            var paychecks = await _paycheckInterface.GetPaychecks(empid);

            if (paychecks == null)
            {
                return NotFound();
            }

            return Ok(paychecks);
        }

        [HttpGet("single/{id:int")]
        private async Task<ActionResult<IEnumerable<Paycheck>>> GetPaycheck(int id)
        {
            var paycheck = await _paycheckInterface.GetPaycheck(id);

            if (paycheck == null)
            {
                return NotFound();
            }

            return Ok(paycheck);
        }

        [HttpPost]
        public async Task<ActionResult> GeneratePaycheck(int id)
        {
            var paycheck = await _paycheckInterface.GeneratePaycheck(id);
            return Ok(paycheck);
        }


    }
}