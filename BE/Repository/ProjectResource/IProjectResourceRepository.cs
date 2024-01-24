using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;

namespace Repository
{
    public interface IProjectResourceRepository
    {
        public List<ProjectResource> GetProjectResource();

        public ProjectResource GetProjectResourceByID(int id);

        public void SaveProjectResource(ProjectResource projectResource);

        public void UpdateProjectResource(ProjectResource projectResource);

        public void DeleteProjectResource(ProjectResource projectResource);
    }
}
