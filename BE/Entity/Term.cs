using System;
using System.Collections.Generic;

namespace Entity
{
    public partial class Term
    {
        public Term()
        {
            Students = new HashSet<Student>();
        }

        public int TermId { get; set; }
        public int? Term1 { get; set; }
        public string? Note { get; set; }

        public virtual ICollection<Student> Students { get; set; }
    }
}
