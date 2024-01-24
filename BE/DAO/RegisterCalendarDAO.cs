using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAO
{
    public class RegisterCalendarDAO
    {
        public static List<RegisterCalendar> GetRegisterCalendar()
        {
            var listRegisterCalendar = new List<RegisterCalendar>();
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    listRegisterCalendar = context.RegisterCalendars.ToList();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return listRegisterCalendar;
        }

        public static void SaveRegisterCalendar(RegisterCalendar registerCalendar)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.RegisterCalendars.Add(registerCalendar);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void UpdateRegisterCalendar(RegisterCalendar registerCalendar)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.Entry<RegisterCalendar>(registerCalendar).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void DeleteRegisterCalendar(RegisterCalendar registerCalendar)
        {
            try
            {
                /*using (var context = new SEProjectManagementContext())
                {
                    var deleteRegisterCalendar = context.RegisterCalendars.SingleOrDefault(c => c.TopicId == RegisterCalendar.TopicId);
                    context.RegisterCalendars.Remove(deleteRegisterCalendar);
                    context.SaveChanges();
                }*/
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}
