using System;
using System.Collections.Generic;

namespace Entity
{
    public partial class Project
    {
        public Project()
        {
            ProjectDetails = new HashSet<ProjectDetail>();
            ProjectProgresses = new HashSet<ProjectProgress>();
            ProjectResources = new HashSet<ProjectResource>();
        }

        public int ProjectId { get; set; }
        public string? ProjectName { get; set; }
        public string? Request { get; set; }
        public string? Description { get; set; }
        public decimal? Point { get; set; }
        public int? Semester { get; set; }
        public int? Year { get; set; }
        public int? Student1Id { get; set; }
        public int? Student2Id { get; set; }
        public int? InstructorId { get; set; }
        public int? SubjectId { get; set; }
        public string? Status { get; set; }

        public virtual Instructor? Instructor { get; set; }
        public virtual Student? Student1 { get; set; }
        public virtual Subject? Subject { get; set; }
        public virtual ICollection<ProjectDetail> ProjectDetails { get; set; }
        public virtual ICollection<ProjectProgress> ProjectProgresses { get; set; }
        public virtual ICollection<ProjectResource> ProjectResources { get; set; }
    }
}
