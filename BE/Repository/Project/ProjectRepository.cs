using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;
using DAO;

namespace Repository
{
    public class ProjectRepository : IProjectRepository
    {
        public void DeleteProject(Project project) => ProjectDAO.DeleteProject(project);

        public List<Project> GetProject() => ProjectDAO.GetProject();

        public Project GetProjectByID(int id)
        {
            Project project = new Project();
            project = ProjectDAO.GetProject().SingleOrDefault(p => p.ProjectId == id);
            return project;
        }

        //public List<Project> GetProjectByStudentID(int id)
        //{
        //    List<Project> listProject = new List<Project>();
        //    listProject = ProjectDAO.GetProject().SingleOrDefault(p => (p.Student1Id == id || p.Student2Id == id));
        //    return listProject;
        //}

        public List<Project> GetProjectByStudentID(int id) 
        {
            IEnumerable<Project> projects = ProjectDAO.GetProject().Where(p => (p.Student1Id == id || p.Student2Id == id));
            List<Project> listProject = projects.ToList();
            return listProject;
        }

        public List<Project> GetProjectByInstructorID(int id)
        {
            IEnumerable<Project> projects = ProjectDAO.GetProject().Where(p => p.InstructorId == id);
            List<Project> listProject = projects.ToList();
            return listProject;
        }

        public void SaveProject(Project project) => ProjectDAO.SaveProject(project);

        public void UpdateProject(Project project) => ProjectDAO.UpdateProject(project);
    }
}
