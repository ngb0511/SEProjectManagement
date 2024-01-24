using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;

namespace Repository
{
    public interface IInstructorRepository
    {
        public List<Instructor> GetInstructor();

        public Instructor GetInstructorByID(int id);

        public Instructor GetInstructorByAccount(int id);

        public void SaveInstructor(Instructor instructor);

        public void UpdateInstructor(Instructor instructor);

        public void DeleteInstructor(Instructor instructor);
    }
}
