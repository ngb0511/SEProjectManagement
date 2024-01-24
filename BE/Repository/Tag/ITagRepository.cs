using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;

namespace Repository
{
    public interface ITagRepository
    {
        public List<Tag> GetTag();

        public Tag GetTagByID(int id);

        public void SaveTag(Tag tag);

        public void UpdateTag(Tag tag);

        public void DeleteTag(Tag tag);

        public Tag GetTagByName(string tagName);
    }
}
