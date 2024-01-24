using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;

namespace Repository
{
    public interface IProjectProgressRepository
    {
        public List<ProjectProgress> GetProjectProgress();

        public ProjectProgress GetProjectProgressByID(int id);

        public List<ProjectProgress> GetProjectProgressByProjectID(int id);

        public void SaveProjectProgress(ProjectProgress projectProgress);

        public void UpdateProjectProgress(ProjectProgress projectProgress);

        public void DeleteProjectProgress(ProjectProgress projectProgress);
    }
}
