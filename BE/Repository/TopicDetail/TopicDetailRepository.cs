using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAO;

namespace Repository
{
    public class TopicDetailRepository : ITopicDetailRepository
    {
        public void DeleteTopicDetail(TopicDetail TopicDetail) => TopicDetailDAO.DeleteTopicDetail(TopicDetail);

        public List<TopicDetail> GetTopicDetail() => TopicDetailDAO.GetTopicDetail();

        public List<TopicDetail> GetTopicDetailByID(int id)
        {
            IEnumerable<TopicDetail> topics = TopicDetailDAO.GetTopicDetail().Where(p => p.TopicId == id);
            List<TopicDetail> topicList = topics.ToList();
            //topics = TopicDetailDAO.GetTopicDetail().Where(p => p.TagId == tagID);
            return topicList;
        }

        public void SaveTopicDetail(TopicDetail TopicDetail) => TopicDetailDAO.SaveTopicDetail(TopicDetail);

        public void UpdateTopicDetail(TopicDetail TopicDetail) => TopicDetailDAO.UpdateTopicDetail(TopicDetail);

        public List<TopicDetail> GetTopicDetailsByTag(int tagID)
        {
            IEnumerable<TopicDetail> topics = TopicDetailDAO.GetTopicDetail().Where(p => p.TagId == tagID);
            List<TopicDetail> topicList = topics.ToList();
            //topics = TopicDetailDAO.GetTopicDetail().Where(p => p.TagId == tagID);
            return topicList;
        }
    }
}
