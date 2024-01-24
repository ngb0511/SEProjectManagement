using System;
using System.Collections.Generic;

namespace Entity
{
    public partial class Topic
    {
        public Topic()
        {
            TopicDetails = new HashSet<TopicDetail>();
            TopicRegisters = new HashSet<TopicRegister>();
        }

        public int TopicId { get; set; }
        public string? TopicName { get; set; }
        public string? Request { get; set; }
        public string? Description { get; set; }
        public int? InstructorId { get; set; }
        public int? SubjectId { get; set; }

        public virtual Instructor? Instructor { get; set; }
        public virtual Subject? Subject { get; set; }
        public virtual ICollection<TopicDetail> TopicDetails { get; set; }
        public virtual ICollection<TopicRegister> TopicRegisters { get; set; }
    }
}
