using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;

namespace DAO
{
    public class ProjectProgressDAO
    {
        public static List<ProjectProgress> GetProjectProgress()
        {
            var listProjectProgress = new List<ProjectProgress>();
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    listProjectProgress = context.ProjectProgresses.ToList();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return listProjectProgress;
        }

        public static void SaveProjectProgress(ProjectProgress projectProgress)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.ProjectProgresses.Add(projectProgress);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void UpdateProjectProgress(ProjectProgress projectProgress)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.Entry<ProjectProgress>(projectProgress).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void DeleteProjectProgress(ProjectProgress projectProgress)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    var deleteProjectProgress = context.ProjectProgresses.SingleOrDefault(c => c.ProjectId == projectProgress.ProjectId);
                    context.ProjectProgresses.Remove(deleteProjectProgress);
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
