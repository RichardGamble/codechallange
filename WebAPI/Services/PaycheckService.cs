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
    public class PaycheckService : IPaycheckInterface
    {
        private readonly EmployeeDBContext _dbContext;
        private readonly IEmployeeInterface _employeeInterface;

        public PaycheckService(EmployeeDBContext employeeDBContext, IEmployeeInterface employeeInterface)
        {
            _dbContext = employeeDBContext;
            _employeeInterface = employeeInterface;
        }

        public async Task<IEnumerable<Paycheck>> GetPaychecks(int empId)
        {
            return await _dbContext.Paychecks.Where(p => p.EmployeeId == empId).Include(p => p.Deductions).ToListAsync();
        }

        public async Task<Paycheck> GetPaycheck(int id)
        {
            return await _dbContext.Paychecks.FirstOrDefaultAsync(e => e.PaycheckId == id);
        }

        public async Task<Paycheck> GeneratePaycheck(int id)
        {
            Employee employee = await _employeeInterface.GetEmployee(id);

            decimal grossPay = 2000.00M; //employee gross pay initial
            decimal dependentDeduction = 19.23M; // dependent deduction
            decimal employeeBenefitsCost = 38.46M; //employee benefits cost
            decimal discount = .10M;
            decimal employeeDeductions = 38.46M;
            decimal dependentsDeductions = 0M;

            Paycheck paycheck = new Paycheck();
            paycheck.EmployeeId = employee.EmployeeId;
            paycheck.GrossPay = grossPay;
            employeeDeductions -= NameDiscount(employee.EmployeeFirstName) ? discount * employeeBenefitsCost : 0;
            List<Deduction> deductions = new List<Deduction>();

            if (employee.Dependents != null)
            {
                foreach (Dependent dependent in employee.Dependents)
                {
                    Deduction deduction = new Deduction();
                    deduction.Discount = NameDiscount(dependent.DependentFirstName) ? discount * dependentDeduction : 0M;
                    deduction.Cost = dependentDeduction - deduction.Discount;
                    deduction.Name = dependent.DependentFirstName + " " + dependent.DependentLastName;
                    deduction.PaycheckId = 1;
                    dependentsDeductions += (Decimal)deduction.Cost;
                    deductions.Add(deduction);
                }
            }

            paycheck.DeductionsTotal = employeeDeductions + dependentsDeductions;
            paycheck.NetPay = paycheck.GrossPay - paycheck.DeductionsTotal;
            paycheck.CreatedDate = DateTime.Now;
            
            var result = await _dbContext.Paychecks.AddAsync(paycheck);
            await _dbContext.SaveChangesAsync();

            if (deductions != null && result!= null) AddDeductions(result.Entity.PaycheckId, deductions);
            return result.Entity;
        }

        public  void AddDeductions(int paycheckId, List<Deduction> deductions)
        {
            foreach (Deduction deduction in deductions)
            {
                deduction.PaycheckId = paycheckId;
                 _dbContext.Deductions.Add(deduction);
                 _dbContext.SaveChanges();
            }
        }

        private bool NameDiscount(string name)
        {
            if (name != "")
            {
                string letter = name.Substring(0, 1);
                return (letter == "A" || letter == "a");
            }
            return false;
        }

        public async Task<Paycheck> CreatePaycheck(Paycheck emp)
        {
            var paycheck = new Paycheck
            {
                //PaycheckFirstName = emp.PaycheckFirstName,
                //PaycheckLastName = emp.PaycheckLastName,
                //DateCreated = DateTime.Now,
                //DateUpdated = DateTime.Now,
                //DateOfBirth = emp.DateOfBirth,
                //PaycheckSsn = emp.PaycheckSsn,
                //IsTerminated = emp.IsTerminated
            };

            _dbContext.Paychecks.Add(paycheck);
            await _dbContext.SaveChangesAsync();

            return paycheck;
        }

        public async Task<Paycheck> UpdatePaycheck(Paycheck emp)
        {
            var paycheck = await _dbContext.Paychecks.FirstOrDefaultAsync(e => e.PaycheckId == emp.PaycheckId);

            if (paycheck == null)
            {
                return null;
            }

            //paycheck.PaycheckFirstName = emp.PaycheckFirstName;
            //paycheck.PaycheckLastName = emp.PaycheckLastName;
            //paycheck.DateUpdated = DateTime.Now;
            //paycheck.PaycheckSsn = emp.PaycheckSsn;
            //paycheck.DateOfBirth = emp.DateOfBirth;
            //paycheck.IsTerminated = emp.IsTerminated;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return null;
            }

            return paycheck;
        }

        public async Task<Paycheck> DeletePaycheck(int id)
        {

            var paycheck = await _dbContext.Paychecks.FindAsync(id);

            if (paycheck == null)
            {
                return null;
            }

            try
            {
                _dbContext.Remove(paycheck);
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!PaycheckExists(id))
            {
                return null;
            }
            return paycheck;
        }
        private bool PaycheckExists(int id)
        {
            return _dbContext.Paychecks.Any(e => e.PaycheckId == id);
        }

        public Task<Paycheck> AddPaycheck(Paycheck Paycheck)
        {
            throw new NotImplementedException();
        }
    }
}
