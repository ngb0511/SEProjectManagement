using Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repository;
using System.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SEProjectManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicDetailController : ControllerBase
    {
        private static ITopicDetailRepository repository = new TopicDetailRepository();
        private static SEProjectManagementContext _context = new SEProjectManagementContext();

        // GET: api/<TopicDetailController>
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<TopicDetail>>> GetTopicDetails()
        {
            var listTopicDetail = repository.GetTopicDetail();

            if (listTopicDetail == null)
            {
                return NotFound();
            }
            return listTopicDetail;
        }

        [HttpGet("GetTopicDetailByID/{id}")]
        public async Task<ActionResult<IEnumerable<TopicDetail>>> GetTopicDetailByID(int id)
        {
            var listProjectDetail = repository.GetTopicDetailByID(id);

            if (listProjectDetail == null)
            {
                return NotFound();
            }
            return listProjectDetail;
            //return (_context.TopicRegisters?.Any(e => (e.Student1Id == id || e.Student2Id == id) && e.Status == "approved")).GetValueOrDefault();
        }

        [HttpGet("GetTopicDetailsByTag/{tagID}")]
        public async Task<ActionResult<IEnumerable<TopicDetail>>> GetTopicDetailsByTag(int tagID)
        {
            var listProjectDetail = repository.GetTopicDetailsByTag(tagID);

            if (listProjectDetail == null)
            {
                return NotFound();
            }
            return listProjectDetail;
            //return (_context.TopicRegisters?.Any(e => (e.Student1Id == id || e.Student2Id == id) && e.Status == "approved")).GetValueOrDefault();
        }

        // POST api/<TopicDetailController>
        [HttpPost("AddTopicDetail")]
        public async Task<ActionResult<TopicDetail>> PostTopicDetail(TopicDetail topicDetail)
        {
            if (topicDetail == null)
            {
                return BadRequest();
      }
            _context.TopicDetails.Add(topicDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PostTopicDetail", new { id = topicDetail.TopicId }, topicDetail);
        }

        // PUT: api/TopicDetail/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("UpdateTopicDetail/{id}")]
        public async Task<IActionResult> PutTopicDetail(int id, TopicDetail topicDetail)
        {
            if (id != topicDetail.TopicId)
            {
                return BadRequest();
            }

            _context.Entry(topicDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TopicDetailExists(id))
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

        // DELETE api/<TopicDetailController>/5
        [HttpDelete("DeleteTopicDetail/{id}")]
        public async Task<IActionResult> DeleteTopicDetail(int id)
        {
            if (_context.TopicDetails == null)
            {
                return NotFound();
            }

            var listTopicDetail = repository.GetTopicDetailByID(id).ToList();

            //var listTopicDetail = await _context.TopicDetails.FindAsync(id);
            if (listTopicDetail == null)
            {
                return NotFound();
            }

            _context.TopicDetails.RemoveRange(listTopicDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TopicDetailExists(int id)
        {
            return (_context.TopicDetails?.Any(e => e.TopicId == id)).GetValueOrDefault();
        }
    }
}
