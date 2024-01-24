using Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SEProjectManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private static ITagRepository repository = new TagRepository();
        private static SEProjectManagementContext _context = new SEProjectManagementContext();

        // GET: api/<TagController>
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Tag>>> GetTags()
        {
            var listTag = repository.GetTag();

            if (listTag == null)
            {
                return NotFound();
            }
            return listTag;
        }

        // GET api/<TagController>/5
        [HttpGet("GetTagByID/{id}")]
        public async Task<ActionResult<Tag>> GetTag(int id)
        {
            Tag Tag = repository.GetTagByID(id);

            if (Tag == null)
            {
                return NotFound();
            }
            return Tag;
        }

        [HttpGet("GetTagByName/{tagName}")]
        public async Task<ActionResult<Tag>> GetTagByName(string tagName)
        {
            Tag Tag = repository.GetTagByName(tagName);

            if (Tag == null)
            {
                return NotFound();
            }
            return Tag;
        }

        // POST api/<TagController>
        [HttpPost("AddTag")]
        public async Task<ActionResult<Tag>> PostTag(Tag tag)
        {
            if (tag == null)
            {
                return BadRequest();
      }
            _context.Tags.Add(tag);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PostTag", new { id = tag.TagId }, tag);
        }

        // PUT: api/Tag/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("UpdateTag/{id}")]
        public async Task<IActionResult> PutTag(int id, Tag tag)
        {
            if (id != tag.TagId)
            {
                return BadRequest();
            }

            _context.Entry(tag).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TagExists(id))
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

        // DELETE api/<TagController>/5
        [HttpDelete("DeleteTag/{id}")]
        public async Task<IActionResult> DeleteTag(int id)
        {
            if (_context.Tags == null)
            {
                return NotFound();
            }
            var tag = await _context.Tags.FindAsync(id);
            if (tag == null)
            {
                return NotFound();
            }

            _context.Tags.Remove(tag);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TagExists(int id)
        {
            return (_context.Tags?.Any(e => e.TagId == id)).GetValueOrDefault();
        }
    }
}
