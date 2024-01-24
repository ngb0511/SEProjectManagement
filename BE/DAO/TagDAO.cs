using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;

namespace DAO
{
    public class TagDAO
    {
        public static List<Tag> GetTag()
        {
            var listTag = new List<Tag>();
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    listTag = context.Tags.ToList();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return listTag;
        }

        public static void SaveTag(Tag tag)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.Tags.Add(tag);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void UpdateTag(Tag tag)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.Entry<Tag>(tag).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void DeleteTag(Tag tag)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    var deleteTag = context.Tags.SingleOrDefault(c => c.TagId == tag.TagId);
                    context.Tags.Remove(deleteTag);
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
