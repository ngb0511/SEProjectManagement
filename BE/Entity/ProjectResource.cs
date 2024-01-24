using System;
using System.Collections.Generic;

namespace Entity
{
    public partial class ProjectResource
    {
        public int ResourcesId { get; set; }
        public int? ProjectId { get; set; }
        public string? ResourcesName { get; set; }
        public string? FilePath { get; set; }

        public virtual Project? Project { get; set; }
    }
}
