using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;

namespace Repository
{
    public interface ITopicDetailRepository
    {
        public List<TopicDetail> GetTopicDetail();

        public void SaveTopicDetail(TopicDetail TopicDetail);

        public void UpdateTopicDetail(TopicDetail TopicDetail);

        public void DeleteTopicDetail(TopicDetail TopicDetail);

        public List<TopicDetail> GetTopicDetailByID(int id);

        public List<TopicDetail> GetTopicDetailsByTag(int tagID);
    }
}
