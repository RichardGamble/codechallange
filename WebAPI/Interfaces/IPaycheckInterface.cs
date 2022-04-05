using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IPaycheckInterface
    {
        public Task<IEnumerable<Paycheck>> GetPaychecks(int empId);
        public Task<Paycheck> GetPaycheck(int id);
        public Task<Paycheck> UpdatePaycheck(Paycheck emp);
        public Task<Paycheck> DeletePaycheck(int id);
        public Task<Paycheck> GeneratePaycheck(int id);
        public Task<IEnumerable<Payroll>> GetPayroll(int id);
    }
}
