using Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SEProjectManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicController : ControllerBase
    {
        private static ITopicRepository repository = new TopicRepository();
        private static IInstructorRepository instructorRepository = new InstructorRepository();
        private static ISubjectRepository subjectRepository = new SubjectRepository();
        private static SEProjectManagementContext _context = new SEProjectManagementContext();

        // GET: api/<TopicController>
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Topic>>> GetTopics()
        {
            var result = from topic in _context.Topics
                         join Subject in _context.Subjects on topic.SubjectId equals Subject.SubjectId
                         join Instructor in _context.Instructors on topic.InstructorId equals Instructor.InstructorId
                         select new
                         {
                             TopicId = topic.TopicId,
                             TopicName = topic.TopicName,
                             Request = topic.Request,
                             Description = topic.Description,
                             SubjectId = topic.SubjectId,
                             SubjectName = Subject.SubjectName,
                             InstructorId = topic.InstructorId,
                             IName = Instructor.IName
                         };
            return Ok(result);
        }

        // GET api/<TopicController>/5
        [HttpGet("GetTopicsByID/{id}")]
        public async Task<ActionResult<Topic>> GetTopic(int id)
        {
            Topic topic = repository.GetTopicByID(id);

            if (topic == null)  
            {
                return NotFound();
            }
            return topic;
        }

        [HttpGet("GetTopicsByName/{topicName}")]
        public async Task<ActionResult<IEnumerable<Topic>>> GetTopicsByName(string topicName)
        {
            var listTopic = repository.GetTopicsByName(topicName);

            if (listTopic == null)
            {
                return NotFound();
            }
            return listTopic;
        }

        [HttpGet("GetTopicsBySubject/{subjectID}")]
        public async Task<IActionResult> GetTopicsBySubject(int subjectID)
        {
            //var listTopic = repository.GetTopicsBySubject(subjectID);

            //if (listTopic == null)
            //{
            //    return NotFound();
            //}
            //return listTopic;

            var result = from topic in _context.Topics
                         join Subject in _context.Subjects on topic.SubjectId equals Subject.SubjectId
                         join Instructor in _context.Instructors on topic.InstructorId equals Instructor.InstructorId
                         select new
                         {
                             TopicId = topic.TopicId,
                             TopicName = topic.TopicName,
                             Request = topic.Request,
                             Description = topic.Description,
                             SubjectId = topic.SubjectId,
                             SubjectName = Subject.SubjectName,
                             InstructorId = topic.InstructorId,
                             IName = Instructor.IName
                         };
            var resultByID = result.Where(x => x.SubjectId == subjectID);
            return Ok(resultByID);
        }

        [HttpGet("GetTopicsWithTag")]
        public async Task<IActionResult> GetTopicsWithTag([FromQuery] int subjectID, int tagId)
        {

            var result = from topic in _context.Topics
                         join Subject in _context.Subjects on topic.SubjectId equals Subject.SubjectId
                         join Instructor in _context.Instructors on topic.InstructorId equals Instructor.InstructorId
                         join TopicDetail in _context.TopicDetails on topic.TopicId equals TopicDetail.TopicId
                         select new
                         {
                             TopicId = topic.TopicId,
                             TopicName = topic.TopicName,
                             Request = topic.Request,
                             Description = topic.Description,
                             SubjectId = topic.SubjectId,
                             SubjectName = Subject.SubjectName,
                             InstructorId = topic.InstructorId,
                             IName = Instructor.IName,
                             TagId = TopicDetail.TagId
                         };

            var resultByID = result.Where(x => (x.SubjectId == subjectID && x.TagId == tagId));
            return Ok(resultByID);
        }

        [HttpGet("GetTopicsByTag/{tagId}")]
        public async Task<IActionResult> GetTopicsByTag(int tagId)
        {

            var result = from topic in _context.Topics
                         join Subject in _context.Subjects on topic.SubjectId equals Subject.SubjectId
                         join Instructor in _context.Instructors on topic.InstructorId equals Instructor.InstructorId
                         join TopicDetail in _context.TopicDetails on topic.TopicId equals TopicDetail.TopicId
                         select new
                         {
                             TopicId = topic.TopicId,
                             TopicName = topic.TopicName,
                             Request = topic.Request,
                             Description = topic.Description,
                             SubjectId = topic.SubjectId,
                             SubjectName = Subject.SubjectName,
                             InstructorId = topic.InstructorId,
                             IName = Instructor.IName,
                             TagId = TopicDetail.TagId
                         };
            var resultByID = result.Where(x => x.TagId == tagId);
            return Ok(resultByID);
        }

        // POST api/<TopicController>
        [HttpPost("AddTopic")]
        public async Task<ActionResult<Topic>> PostTopic(Topic topic)
        {
            if (topic == null)
            {
                return BadRequest();
      }
            _context.Topics.Add(topic);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PostTopic", new { id = topic.TopicId }, topic);
        }

        // PUT api/<TopicController>/5
        [HttpPut("UpdateTopic/{id}")]
        public async Task<IActionResult> PutTopic(int id, Topic topic)
        {
            if (id != topic.TopicId)
            {
                return BadRequest();
            }

            _context.Entry(topic).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TopicExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE api/<TopicController>/5
        [HttpDelete("DeleteTopic/{id}")]
        public async Task<IActionResult> DeleteTopic(int id)
        {
            if (_context.Topics == null)
            {
                return NotFound();
            }
            var topic = await _context.Topics.FindAsync(id);
            if (topic == null)
            {
                return NotFound();
            }

            _context.Topics.Remove(topic);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TopicExists(int id)
        {
            return (_context.Topics?.Any(e => e.TopicId == id)).GetValueOrDefault();
        }

    }
}
