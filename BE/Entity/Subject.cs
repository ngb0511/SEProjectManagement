using System;
using System.Collections.Generic;

namespace Entity
{
    public partial class Subject
    {
        public Subject()
        {
            CurrentSubjects = new HashSet<CurrentSubject>();
            Projects = new HashSet<Project>();
            Topics = new HashSet<Topic>();
        }

        public int SubjectId { get; set; }
        public string? SubjectName { get; set; }

        public virtual ICollection<CurrentSubject> CurrentSubjects { get; set; }
        public virtual ICollection<Project> Projects { get; set; }
        public virtual ICollection<Topic> Topics { get; set; }
    }
}
