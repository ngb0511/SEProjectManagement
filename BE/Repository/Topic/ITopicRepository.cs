using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;

namespace Repository
{
    public interface ITopicRepository
    {
        public List<Topic> GetTopic();

        public Topic GetTopicByID(int id);

        public void SaveTopic(Topic Topic);

        public void UpdateTopic(Topic Topic);

        public void DeleteTopic(Topic Topic);

        public List<Topic> GetTopicsByName(string topicName);

        public List<Topic> GetTopicsBySubject(int subjectID);
    }
}
