using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;

namespace DAO
{
    public class ProjectDetailDAO
    {
        public static List<ProjectDetail> GetProjectDetail()
        {
            var listProjectDetail = new List<ProjectDetail>();
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    listProjectDetail = context.ProjectDetails.ToList();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return listProjectDetail;
        }

        public static void SaveProjectDetail(ProjectDetail projectDetail)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.ProjectDetails.Add(projectDetail);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void UpdateProjectDetail(ProjectDetail projectDetail)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.Entry<ProjectDetail>(projectDetail).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void DeleteProjectDetail(ProjectDetail projectDetail)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    var deleteProjectDetail = context.ProjectDetails.SingleOrDefault(c => c.ProjectId == projectDetail.ProjectId);
                    context.ProjectDetails.Remove(deleteProjectDetail);
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
