using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;
using DAO;

namespace Repository
{
    public class StudentRepository : IStudentRepository
    {
        public void DeleteStudent(Student student) => StudentDAO.DeleteStudent(student);

        public List<Student> GetStudent() => StudentDAO.GetStudent();

        public Student GetStudentByID(int id)
        {
            Student student = new Student();
            student = StudentDAO.GetStudent().SingleOrDefault(p => p.StudentId == id);
            return student;
        }

        public Student GetStudentByAccount(int id)
        {
            Student student = new Student();
            student = StudentDAO.GetStudent().SingleOrDefault(p => p.AccountId == id);
            return student;
        }

        public void SaveStudent(Student student) => StudentDAO.SaveStudent(student);

        public void UpdateStudent(Student student) => StudentDAO.UpdateStudent(student);
    }
}
