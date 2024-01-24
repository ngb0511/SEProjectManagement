using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;
using DAO;

namespace Repository
{
    public class TermRepository : ITermRepository
    {
        public void DeleteTerm(Term term) => TermDao.DeleteTerm(term);

        public List<Term> GetTerm() => TermDao.GetTerm();

        public Term GetTermByID(int id)
        {
            Term term = new Term();
            term = TermDao.GetTerm().SingleOrDefault(p => p.TermId == id);
            return term;
        }

        public void SaveTerm(Term term) => TermDao.SaveTerm(term);

        public void UpdateTerm(Term term) => TermDao.UpdateTerm(term);
    }
}
