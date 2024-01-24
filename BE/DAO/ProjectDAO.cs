using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;

namespace DAO
{
    public class ProjectDAO
    {
        public static List<Project> GetProject()
        {
            var listProject = new List<Project>();
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    listProject = context.Projects.ToList();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return listProject;
        }

        public static void SaveProject(Project project)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.Projects.Add(project);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void UpdateProject(Project project)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.Entry<Project>(project).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void DeleteProject(Project project)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    var deleteProject = context.Projects.SingleOrDefault(c => c.ProjectId == project.ProjectId);
                    context.Projects.Remove(deleteProject);
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
