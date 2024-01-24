using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;

namespace DAO
{
    public class CurrentSubjectDAO
    {
        public static List<CurrentSubject> GetCurrentSubject()
        {
            var listCurrentSubject = new List<CurrentSubject>();
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    listCurrentSubject = context.CurrentSubjects.ToList();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return listCurrentSubject;
        }

        public static void SaveCurrentSubject(CurrentSubject currentSubject)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.CurrentSubjects.Add(currentSubject);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void UpdateCurrentSubject(CurrentSubject currentSubject)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.Entry<CurrentSubject>(currentSubject).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void DeleteCurrentSubject(CurrentSubject currentSubject)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    var deleteCurrentSubject = context.CurrentSubjects.SingleOrDefault(c => c.CSubjectId == currentSubject.CSubjectId);
                    context.CurrentSubjects.Remove(deleteCurrentSubject);
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
