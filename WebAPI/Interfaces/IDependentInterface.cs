using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IDependentInterface
    {
        public Task<IEnumerable<Dependent>> GetDependents(int id);
        public Task<Dependent> GetDependent(int id);
        public Task<Dependent> UpdateDependent(Dependent emp);
        public Task<Dependent> DeleteDependent([FromRoute] int id);
        public Task<Dependent> AddDependent(Dependent dependent);
    }
}
