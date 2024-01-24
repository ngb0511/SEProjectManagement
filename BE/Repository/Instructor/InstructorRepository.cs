using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;
using DAO;

namespace Repository
{
    public class InstructorRepository : IInstructorRepository
    {
        public void DeleteInstructor(Instructor instructor) => InstructorDAO.DeleteInstructor(instructor);

        public List<Instructor> GetInstructor() => InstructorDAO.GetInstructor();

        public Instructor GetInstructorByID(int id)
        {
            Instructor instructor = new Instructor();
            instructor = InstructorDAO.GetInstructor().SingleOrDefault(p => p.InstructorId == id);
            return instructor;
        }

        public Instructor GetInstructorByAccount(int id)
        {
            Instructor student = new Instructor();
            student = InstructorDAO.GetInstructor().SingleOrDefault(p => p.AccountId == id);
            return student;
        }

        public void SaveInstructor(Instructor instructor) => InstructorDAO.SaveInstructor(instructor);

        public void UpdateInstructor(Instructor instructor) => InstructorDAO.UpdateInstructor(instructor);
    }
}
