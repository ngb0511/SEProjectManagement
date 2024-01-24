using System;
using System.Collections.Generic;

namespace Entity
{
    public partial class TopicRegister
    {
        public int RegisterId { get; set; }
        public int? TopicId { get; set; }
        public int? Student1Id { get; set; }
        public int? Student2Id { get; set; }
        public string? Status { get; set; }

        public virtual Student? Student1 { get; set; }
        public virtual Topic? Topic { get; set; }
    }
}
