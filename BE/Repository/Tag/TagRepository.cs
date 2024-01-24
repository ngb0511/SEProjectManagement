using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;
using DAO;

namespace Repository
{
    public class TagRepository : ITagRepository
    {
        public void DeleteTag(Tag tag) => TagDAO.DeleteTag(tag);

        public List<Tag> GetTag() => TagDAO.GetTag();

        public Tag GetTagByID(int id)
        {
            Tag tag = new Tag();
            tag = TagDAO.GetTag().SingleOrDefault(p => p.TagId == id);
            return tag;
        }

        public void SaveTag(Tag tag) => TagDAO.SaveTag(tag);

        public void UpdateTag(Tag tag) => TagDAO.UpdateTag(tag);

        public Tag GetTagByName(string tagName)
        {
            Tag tag = new Tag();
            tag = TagDAO.GetTag().SingleOrDefault(p => p.TagName == tagName);
            return tag;
        }

        //public List<Tag> GetTagByName(string tagName)
        //{
        //    IEnumerable<Tag> tags = TagDAO.GetTag().Where(p => p.TagName.Contains(tagName));
        //    List<Tag> tagList = tags.ToList();
        //    //topics = TopicDetailDAO.GetTopicDetail().Where(p => p.TagId == tagID);
        //    return topicList;
        //}
    }
}
