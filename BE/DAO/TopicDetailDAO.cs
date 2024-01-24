using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;

namespace DAO
{
    public class TopicDetailDAO
    {
        public static List<TopicDetail> GetTopicDetail()
        {
            var listTopicDetail = new List<TopicDetail>();
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    listTopicDetail = context.TopicDetails.ToList();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return listTopicDetail;
        }

        public static void SaveTopicDetail(TopicDetail topicDetail)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.TopicDetails.Add(topicDetail);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void UpdateTopicDetail(TopicDetail topicDetail)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.Entry<TopicDetail>(topicDetail).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void DeleteTopicDetail(TopicDetail topicDetail)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    var deleteTopicDetail = context.TopicDetails.SingleOrDefault(c => c.TopicId == topicDetail.TopicId);
                    context.TopicDetails.Remove(deleteTopicDetail);
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
