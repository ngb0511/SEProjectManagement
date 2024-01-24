using System;
using System.Collections.Generic;

namespace Entity
{
    public partial class ProjectDetail
    {
        public int DetailId { get; set; }
        public int ProjectId { get; set; }
        public int TagId { get; set; }
        public string? Note { get; set; }

        public virtual Project? Project { get; set; }
        public virtual Tag? Tag { get; set; }
    }
}
