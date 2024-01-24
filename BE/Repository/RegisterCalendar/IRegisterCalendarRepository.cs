using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{

    public interface IRegisterCalendarRepository
    {
        public List<RegisterCalendar> GetRegisterCalendar();

        public RegisterCalendar GetRegisterCalendarBySemesterAndYear(RegisterCalendar registerCalendar);

        public void SaveRegisterCalendar(RegisterCalendar registerCalendar);

        public void UpdateRegisterCalendar(RegisterCalendar registerCalendar);

        public void DeleteRegisterCalendar(RegisterCalendar registerCalendar);
    }
}
