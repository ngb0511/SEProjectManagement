using System;
using System.Collections.Generic;

namespace Entity
{
    public partial class Instructor
    {
        public Instructor()
        {
            Projects = new HashSet<Project>();
            Topics = new HashSet<Topic>();
        }

        public int InstructorId { get; set; }
        public string? IName { get; set; }
        public string? Gender { get; set; }
        public DateTime? Birth { get; set; }
        public string? HomeTown { get; set; }
        public string? Address { get; set; }
        public string? Email { get; set; }
        public int? PhoneNumber { get; set; }
        public string? Degree { get; set; }
        public int? AccountId { get; set; }

        public virtual Account? Account { get; set; }
        public virtual ICollection<Project> Projects { get; set; }
        public virtual ICollection<Topic> Topics { get; set; }
    }
}
