using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAO;

namespace Repository
{
    public class TopicRepository : ITopicRepository
    {
        public void DeleteTopic(Topic Topic) => TopicDAO.DeleteTopic(Topic);

        public List<Topic> GetTopic() => TopicDAO.GetTopic();

        public Topic GetTopicByID(int id)
        {
            Topic topic = new Topic();
            topic = TopicDAO.GetTopic().SingleOrDefault(p => p.TopicId == id);
            return topic;
        }

        public void SaveTopic(Topic Topic) => TopicDAO.SaveTopic(Topic);

        public void UpdateTopic(Topic Topic) => TopicDAO.UpdateTopic(Topic);

        public List<Topic> GetTopicsByName(string topicName)
        {
            IEnumerable<Topic> topics = TopicDAO.GetTopic().Where(p => p.TopicName.Contains(topicName));
            List<Topic> topicList = topics.ToList();
            //topics = TopicDetailDAO.GetTopicDetail().Where(p => p.TagId == tagID);
            return topicList;
        }

        public List<Topic> GetTopicsBySubject(int subjectID)
        {
            IEnumerable<Topic> topics = TopicDAO.GetTopic().Where(p => p.SubjectId == subjectID);
            List<Topic> topicList = topics.ToList();
            //topics = TopicDetailDAO.GetTopicDetail().Where(p => p.TagId == tagID);
            return topicList;
        }
    }
}
