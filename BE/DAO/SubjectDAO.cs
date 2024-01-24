using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAO
{
    public class SubjectDAO
    {
        public static List<Subject> GetSubject()
        {
            var listSubject = new List<Subject>();
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    listSubject = context.Subjects.ToList();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return listSubject;
        }

        public static void SaveSubject(Subject subject)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.Subjects.Add(subject);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void UpdateSubject(Subject subject)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.Entry<Subject>(subject).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void DeleteSubject(Subject subject)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    var deleteSubject = context.Subjects.SingleOrDefault(c => c.SubjectId == subject.SubjectId);
                    context.Subjects.Remove(deleteSubject);
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
