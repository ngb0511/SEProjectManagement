using System;
using System.Collections.Generic;

namespace Entity
{
    public partial class CurrentSubject
    {
        public int CSubjectId { get; set; }
        public int? StudentId { get; set; }
        public int? SubjectId { get; set; }

        public virtual Student? Student { get; set; }
        public virtual Subject? Subject { get; set; }
    }
}
