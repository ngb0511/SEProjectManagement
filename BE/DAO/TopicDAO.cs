using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;

namespace DAO
{
    public class TopicDAO
    {
        public static List<Topic> GetTopic()
        {
            var listTopic = new List<Topic>();
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    listTopic = context.Topics.ToList();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return listTopic;
        }

        public static void SaveTopic(Topic topic)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.Topics.Add(topic);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void UpdateTopic(Topic topic)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.Entry<Topic>(topic).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void DeleteTopic(Topic topic)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    var deleteTopic = context.Topics.SingleOrDefault(c => c.TopicId == topic.TopicId);
                    context.Topics.Remove(deleteTopic);
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
