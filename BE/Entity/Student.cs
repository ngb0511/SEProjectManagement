using System;
using System.Collections.Generic;

namespace Entity
{
    public partial class Student
    {
        public Student()
        {
            CurrentSubjects = new HashSet<CurrentSubject>();
            ProjectProgresses = new HashSet<ProjectProgress>();
            Projects = new HashSet<Project>();
            TopicRegisters = new HashSet<TopicRegister>();
        }

        public int StudentId { get; set; }
        public string? SName { get; set; }
        public string? Gender { get; set; }
        public DateTime? Birth { get; set; }
        public string? HomeTown { get; set; }
        public string? Address { get; set; }
        public string? Email { get; set; }
        public int? PhoneNumber { get; set; }
        public int? TermId { get; set; }
        public int? AccountId { get; set; }

        public virtual Account? Account { get; set; }
        public virtual Term? Term { get; set; }
        public virtual ICollection<CurrentSubject> CurrentSubjects { get; set; }
        public virtual ICollection<ProjectProgress> ProjectProgresses { get; set; }
        public virtual ICollection<Project> Projects { get; set; }
        public virtual ICollection<TopicRegister> TopicRegisters { get; set; }
    }
}
