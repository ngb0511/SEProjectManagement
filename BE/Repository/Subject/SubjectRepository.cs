using DAO;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class SubjectRepository : ISubjectRepository
    {
        public void DeleteSubject(Subject subject) => SubjectDAO.DeleteSubject(subject);

        public List<Subject> GetSubject() => SubjectDAO.GetSubject();

        public Subject GetSubjectByID(int id)
        {
            Subject subject = new Subject();
            subject = SubjectDAO.GetSubject().SingleOrDefault(p => p.SubjectId == id);
            return subject;
        }

        public void SaveSubject(Subject subject) => SubjectDAO.SaveSubject(subject);

        public void UpdateSubject(Subject subject) => SubjectDAO.UpdateSubject(subject);

        public Subject GetSubjectByName(string subjectName)
        {
            Subject subject = new Subject();
            subject = SubjectDAO.GetSubject().SingleOrDefault(p => p.SubjectName == subjectName);
            return subject;
        }
    }
}
