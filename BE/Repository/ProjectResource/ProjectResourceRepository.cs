using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;
using DAO;

namespace Repository
{
    public class ProjectResourceRepository : IProjectResourceRepository
    {
        public void DeleteProjectResource(ProjectResource projectResource) => ProjectResourceDAO.DeleteProjectResource(projectResource);

        public List<ProjectResource> GetProjectResource() => ProjectResourceDAO.GetProjectResource();

        public ProjectResource GetProjectResourceByID(int id)
        {
            ProjectResource projectResource = new ProjectResource();
            projectResource = ProjectResourceDAO.GetProjectResource().SingleOrDefault(p => p.ResourcesId == id);
            return projectResource;
        }

        public void SaveProjectResource(ProjectResource projectResource) => ProjectResourceDAO.SaveProjectResource(projectResource);

        public void UpdateProjectResource(ProjectResource projectResource) => ProjectResourceDAO.UpdateProjectResource(projectResource);
    }
}
