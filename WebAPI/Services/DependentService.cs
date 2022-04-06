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
    public class DependentService : IDependentInterface
    {
        private readonly EmployeeDBContext _dbContext;

        public DependentService(EmployeeDBContext dependentDBContext)
        {
            _dbContext = dependentDBContext;
        }

        public async Task<IEnumerable<Dependent>> GetDependents(int id)
        {
            return await _dbContext.Dependents.Where(d => d.EmployeeId == id).OrderBy(d=>d.DependentFirstName).ToListAsync();
        }

        public async Task<Dependent> GetDependent(int id)
        {
            return await _dbContext.Dependents.FirstOrDefaultAsync(e => e.DependentId == id);
        }

        public async Task<Dependent> AddDependent(Dependent dependent)
        {
            dependent.DateCreated = DateTime.Now;
            dependent.DateUpdated = DateTime.Now;
            var result = await _dbContext.Dependents.AddAsync(dependent);
            await _dbContext.SaveChangesAsync();
            return result.Entity;
        }
       
        public async Task<Dependent> UpdateDependent(Dependent dep)
        {
            var dependent = await _dbContext.Dependents.FirstOrDefaultAsync(e => e.DependentId == dep.DependentId);

            if (dependent == null)
            {
                return null;
            }

            dependent.DependentFirstName = dep.DependentFirstName;
            dependent.DependentLastName = dep.DependentLastName;
            dependent.DateUpdated = DateTime.Now;
            dependent.DependentSsn = dep.DependentSsn;
            dependent.DateOfBirth = dep.DateOfBirth;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return null;
            }

            return dependent;
        }

        public async Task<Dependent> DeleteDependent(int id)
        {

            var dependent = await _dbContext.Dependents.FindAsync(id);

            if (dependent == null)
            {
                return null;
            }

            try
            {
                _dbContext.Remove(dependent);
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!DependentExists(id))
            {
                return null;
            }
            return dependent;
        }
        private bool DependentExists(int id)
        {
            return _dbContext.Dependents.Any(e => e.DependentId == id);
        }
    }
}
