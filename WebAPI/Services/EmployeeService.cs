using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Interfaces;
using WebAPI.Models;
using System.Data;

namespace WebAPI.Services
{
    public class EmployeeService : IEmployeeInterface
    {
        private readonly EmployeeDBContext _dbContext;
        private readonly ICompanyInterface _companyInterface;

        public EmployeeService(EmployeeDBContext employeeDBContext, ICompanyInterface companyInterface)
        {
            _dbContext = employeeDBContext;
            _companyInterface = companyInterface;
        }

        public async Task<IEnumerable<Employee>> GetEmployees()
        {
            return await _dbContext.Employees.OrderBy(e=>e.EmployeeLastName).ToListAsync();
        }
        public async Task<IEnumerable<Employee>> GetEmployees(int companyId)
        {
            return await _dbContext.Employees.Where( c=>c.CompanyId == companyId).OrderBy(e => e.EmployeeLastName).ToListAsync();
        }

        public async Task<Employee> GetEmployee(int id)
        {
            return await _dbContext.Employees.Include(e => e.Dependents).FirstOrDefaultAsync(e => e.EmployeeId == id);
        }

        public async Task<Employee> AddEmployee(Employee employee)
        {
            employee.DateCreated = DateTime.Now;
            employee.DateUpdated = DateTime.Now;
            var result = await _dbContext.Employees.AddAsync(employee);
            await _dbContext.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<Employee> UpdateEmployee(Employee emp)
        {
            var employee = await _dbContext.Employees.FirstOrDefaultAsync(e => e.EmployeeId == emp.EmployeeId);

            if (employee == null)
            {
                return null;
            }

            employee.EmployeeFirstName = emp.EmployeeFirstName;
            employee.EmployeeLastName = emp.EmployeeLastName;
            employee.DateUpdated = DateTime.Now;
            employee.EmployeeSsn = emp.EmployeeSsn;
            employee.DateOfBirth = emp.DateOfBirth;
            employee.IsTerminated = emp.IsTerminated;
            employee.CompanyId = emp.CompanyId;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return null;
            }

            return employee;
        }

        public async Task<Employee> DeleteEmployee(int id)
        {

            var employee = await _dbContext.Employees.FindAsync(id);

            if (employee == null)
            {
                return null;
            }

            try
            {
                _dbContext.Remove(employee);
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!EmployeeExists(id))
            {
                return null;
            }
            return employee;
        }
        private bool EmployeeExists(int id)
        {
            return _dbContext.Employees.Any(e => e.EmployeeId == id);
        }
    }
}
