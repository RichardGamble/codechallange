using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IEmployeeInterface
    {
        public Task<IEnumerable<Employee>> GetEmployees();
        public Task<Employee> GetEmployee(int id);
        public Task<Employee> UpdateEmployee(Employee emp);
        public Task<Employee> DeleteEmployee([FromRoute] int id);
        public Task<Employee> AddEmployee(Employee employee);
        public Task<IEnumerable<Employee>> GetEmployees(int id);
    }
}
