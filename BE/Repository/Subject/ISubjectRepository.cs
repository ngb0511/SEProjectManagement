using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public interface ISubjectRepository
    {
        public List<Subject> GetSubject();

        public Subject GetSubjectByID(int id);

        public void SaveSubject(Subject subject);

        public void UpdateSubject(Subject subject);

        public void DeleteSubject(Subject subject);

        public Subject GetSubjectByName(string subjectName);
    }
}
