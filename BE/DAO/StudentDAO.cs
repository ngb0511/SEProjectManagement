using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;

namespace DAO
{
    public class StudentDAO
    {
        public static List<Student> GetStudent()
        {
            var listStudent = new List<Student>();
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    listStudent = context.Students.ToList();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return listStudent;
        }

        public static void SaveStudent(Student student)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.Students.Add(student);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void UpdateStudent(Student student)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.Entry<Student>(student).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void DeleteStudent(Student student)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    var deleteStudent = context.Students.SingleOrDefault(c => c.StudentId == student.StudentId);
                    context.Students.Remove(deleteStudent);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}
