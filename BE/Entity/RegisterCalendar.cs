using System;
using System.Collections.Generic;

namespace Entity
{
    public partial class RegisterCalendar
    {
        public int Rcid { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? Semester { get; set; }
        public int? Ryear { get; set; }
    }
}
