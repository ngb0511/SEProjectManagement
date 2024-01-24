using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;
using DAO;

namespace Repository
{
    public class ProjectDetailRepository : IProjectDetailRepository
    {
        public void DeleteProjectDetail(ProjectDetail projectDetail) => ProjectDetailDAO.DeleteProjectDetail(projectDetail);

        public List<ProjectDetail> GetProjectDetail() => ProjectDetailDAO.GetProjectDetail();

        public List<ProjectDetail> GetProjectDetailByID(int id)
        {
            IEnumerable<ProjectDetail> projectDetail = ProjectDetailDAO.GetProjectDetail().Where(p => p.ProjectId == id);
            List<ProjectDetail> listProjectDetail = projectDetail.ToList();
            return listProjectDetail;
        }

        public void SaveProjectDetail(ProjectDetail projectDetail) => ProjectDetailDAO.SaveProjectDetail(projectDetail);

        public void UpdateProjectDetail(ProjectDetail projectDetail) => ProjectDetailDAO.UpdateProjectDetail(projectDetail);
    }
}
