using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;

namespace DAO
{
    public class TopicRegisterDAO
    {
        public static List<TopicRegister> GetTopicRegister()
        {
            var listTopicRegister = new List<TopicRegister>();
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    listTopicRegister = context.TopicRegisters.ToList();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return listTopicRegister;
        }

        public static void SaveTopicRegister(TopicRegister topicRegister)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.TopicRegisters.Add(topicRegister);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void UpdateTopicRegister(TopicRegister topicRegister)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.Entry<TopicRegister>(topicRegister).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void DeleteTopicRegister(TopicRegister topicRegister)
        {
            try
            {
                /*using (var context = new SEProjectManagementContext())
                {
                    var deleteTopicRegister = context.TopicRegisters.SingleOrDefault(c => c.TopicId == topicRegister.TopicId);
                    context.TopicRegisters.Remove(deleteTopicRegister);
                    context.SaveChanges();
                }*/
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}
