using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;

namespace DAO
{
    public class InstructorDAO
    {
        public static List<Instructor> GetInstructor()
        {
            var listInstructor = new List<Instructor>();
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    listInstructor = context.Instructors.ToList();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return listInstructor;
        }

        public static void SaveInstructor(Instructor instructor)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.Instructors.Add(instructor);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void UpdateInstructor(Instructor instructor)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.Entry<Instructor>(instructor).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void DeleteInstructor(Instructor instructor)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    var deleteInstructor = context.Instructors.SingleOrDefault(c => c.InstructorId == instructor.InstructorId);
                    context.Instructors.Remove(deleteInstructor);
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
