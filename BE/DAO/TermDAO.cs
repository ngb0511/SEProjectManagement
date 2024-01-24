using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;

namespace DAO
{
    public class TermDao
    {
        public static List<Term> GetTerm()
        {
            var listTerm = new List<Term>();
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    listTerm = context.Terms.ToList();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return listTerm;
        }

        public static void SaveTerm(Term term)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.Terms.Add(term);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void UpdateTerm(Term term)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.Entry<Term>(term).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void DeleteTerm(Term term)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    var deleteTerm = context.Terms.SingleOrDefault(c => c.TermId == term.TermId);
                    context.Terms.Remove(deleteTerm);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}
