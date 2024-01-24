using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;

namespace Repository
{
    public interface IStudentRepository
    {
        public List<Student> GetStudent();

        public Student GetStudentByID(int id);

        public Student GetStudentByAccount(int id);

        public void SaveStudent(Student student);

        public void UpdateStudent(Student student);

        public void DeleteStudent(Student student);
    }
}
