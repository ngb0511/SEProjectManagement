using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;

namespace DAO
{
    public class ProjectResourceDAO
    {
        public static List<ProjectResource> GetProjectResource()
        {
            var listProjectResource = new List<ProjectResource>();
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    listProjectResource = context.ProjectResources.ToList();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return listProjectResource;
        }

        public static void SaveProjectResource(ProjectResource projectResource)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.ProjectResources.Add(projectResource);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void UpdateProjectResource(ProjectResource projectResource)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.Entry<ProjectResource>(projectResource).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void DeleteProjectResource(ProjectResource projectResource)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    var deleteProjectResource = context.ProjectResources.SingleOrDefault(c => c.ResourcesId == projectResource.ResourcesId);
                    context.ProjectResources.Remove(deleteProjectResource);
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
