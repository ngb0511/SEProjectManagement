using System;
using System.Collections.Generic;

namespace Entity
{
    public partial class ProjectProgress
    {
        public int ProgressId { get; set; }
        public int? ProjectId { get; set; }
        public int? StudentId { get; set; }
        public string? ProgressName { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? Status { get; set; }

        public virtual Project? Project { get; set; }
        public virtual Student? Student { get; set; }
    }
}
