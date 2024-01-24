using System;
using System.Collections.Generic;

namespace Entity
{
    public partial class Tag
    {
        public Tag()
        {
            ProjectDetails = new HashSet<ProjectDetail>();
            TopicDetails = new HashSet<TopicDetail>();
        }

        public int TagId { get; set; }
        public string? TagName { get; set; }
        public string? Description { get; set; }

        public virtual ICollection<ProjectDetail> ProjectDetails { get; set; }
        public virtual ICollection<TopicDetail> TopicDetails { get; set; }
    }
}
