using EmailService;
using Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repository;
//using Repository.MailService;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SEProjectManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicRegisterController : ControllerBase
    {
        private static ITopicRegisterRepository repository = new TopicRegisterRepository();
        private static SEProjectManagementContext _context = new SEProjectManagementContext();
        //private readonly IMailServiceRepository _mailService;

        // GET: api/<TopicRegisterController>
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<TopicRegister>>> GetTopicRegisters()
        {
            var listTopicRegister = repository.GetTopicRegister();

            if (listTopicRegister == null)
            {
                return NotFound();
            }
            return listTopicRegister;
        }

        // GET api/<TopicRegisterController>/5
        [HttpGet("GetTopicRegisterByID/{id}")]
        public async Task<ActionResult<TopicRegister>> GetTopicRegister(int id)
        {
            TopicRegister TopicRegister = repository.GetTopicRegisterByID(id);

            if (TopicRegister == null)
            {
                return NotFound();
            }
            return TopicRegister;
        }

        [HttpGet("GetTopicStatus/{id}")]
        public async Task<ActionResult<string>> GetTopicStatus(int id)
        {
            if (TopicRegisterExists(id))
            {
                return "declined";
            }
            return "approved";
        }

        [HttpGet("CheckTopic/{id}")]
        public async Task<ActionResult<bool>> CheckTopic(int id)
        {
            return TopicRegisterExists(id);
        }

        [HttpGet("CheckRegisteredStudent/{id}")]
        public async Task<ActionResult<bool>> CheckRegisteredStudent(int id)
        {
            return (_context.TopicRegisters?.Any(e => (e.Student1Id == id || e.Student2Id == id) && e.Status == "approved")).GetValueOrDefault();
        }

        // POST api/<TopicRegisterController>
        [HttpPost("AddTopicRegister")]
        public async Task<ActionResult<TopicRegister>> PostTopicRegister(TopicRegister topicRegister)
        {
            if (topicRegister == null)
            {
                return BadRequest();
      }

            _context.TopicRegisters.Add(topicRegister);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PostTopicRegister", new { id = topicRegister.RegisterId }, topicRegister);
        }

        // PUT: api/TopicRegister/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("UpdateTopicRegister/{id}")]
        public async Task<IActionResult> PutTopicRegister(int id, TopicRegister topicRegister)
        {
            if (id != topicRegister.RegisterId)
            {
                return BadRequest();
            }

            _context.Entry(topicRegister).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TopicRegisterExists(id))
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

        // DELETE api/<TopicRegisterController>/5
        [HttpDelete("DeleteTopicRegister/{id}")]
        public async Task<IActionResult> DeleteTopicRegister(int id)
        {
            if (_context.TopicDetails == null)
            {
                return NotFound();
            }

            var topicRegister = repository.GetTopicRegisterByID(id);

            if (topicRegister == null)
            {
                return NotFound();
            }

            _context.TopicRegisters.Remove(topicRegister);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("DeleteAll/{id}")]
        public async Task<IActionResult> DeleteAll(int id)
        {
            var listTopicRegister = repository.GetTopicRegister();

            if (listTopicRegister == null)
            {
                return NoContent();
            }

            for (int i=0;i<listTopicRegister.Count;i++)
            {
                var topicRegister = await _context.TopicRegisters.FindAsync(listTopicRegister[i].RegisterId);
                if (topicRegister == null)
                {
                    return NotFound();
                }

                _context.TopicRegisters.Remove(topicRegister);
                await _context.SaveChangesAsync();
            }

            return NoContent();
        }

        private bool TopicRegisterExists(int id)
        {
            return (_context.TopicRegisters?.Any(e => e.TopicId == id)).GetValueOrDefault();
        }
    }
}
