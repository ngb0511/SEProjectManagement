using System;
using System.Collections.Generic;

namespace Entity
{
    public partial class Account
    {
        public Account()
        {
            Instructors = new HashSet<Instructor>();
            Students = new HashSet<Student>();
        }

        public int AccountId { get; set; }
        public string? Email { get; set; }
        public string? Pwd { get; set; }
        public int? AccountTypeId { get; set; }

        public virtual AccountType? AccountType { get; set; }
        public virtual ICollection<Instructor> Instructors { get; set; }
        public virtual ICollection<Student> Students { get; set; }
    }
}
