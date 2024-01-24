using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;

namespace Repository
{
    public interface IProjectRepository
    {
        public List<Project> GetProject();

        public Project GetProjectByID(int id);

        public List<Project> GetProjectByStudentID(int id);

        public List<Project> GetProjectByInstructorID(int id);

        public void SaveProject(Project project);

        public void UpdateProject(Project project);

        public void DeleteProject(Project project);
    }
}
