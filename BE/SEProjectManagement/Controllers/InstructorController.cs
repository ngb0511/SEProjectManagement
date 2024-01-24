using Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SEProjectManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InstructorController : ControllerBase
    {
        private static IInstructorRepository repository = new InstructorRepository();
        private static SEProjectManagementContext _context = new SEProjectManagementContext();

        // GET: api/<InstructorController>
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Instructor>>> GetInstructors()
        {
            var listInstructor = repository.GetInstructor();

            if (listInstructor == null)
            {
                return NotFound();
            }
            return listInstructor;
        }

        // GET api/<InstructorController>/5
        [HttpGet("GetInstructorByID/{id}")]
        public async Task<ActionResult<Instructor>> GetInstructorByID(int id)
        {
            Instructor Instructor = repository.GetInstructorByID(id);

            if (Instructor == null)
            {
                return NotFound();
            }
            return Instructor;
        }

        [HttpGet("GetInstructorByAccount/{id}")]
        public async Task<ActionResult<Instructor>> GetInstructorByAccount(int id)
        {
            Instructor Instructor = repository.GetInstructorByAccount(id);

            if (Instructor == null)
            {
                return NotFound();
            }
            return Instructor;
        }

        // POST api/<InstructorController>
        [HttpPost("AddInstructor")]
        public async Task<ActionResult<Instructor>> PostInstructor(Instructor instructor)
        {
            if (instructor == null)
            {
                return BadRequest();
      }
            _context.Instructors.Add(instructor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInstructor", new { id = instructor.InstructorId }, instructor);
        }

        // PUT: api/Instructor/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("UpdateInstructor/{id}")]
        public async Task<IActionResult> PutInstructor(int id, Instructor instructor)
        {
            if (id != instructor.InstructorId)
            {
                return BadRequest();
            }

            _context.Entry(instructor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InstructorExists(id))
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

        // DELETE api/<InstructorController>/5
        [HttpDelete("DeleteInstructor/{id}")]
        public async Task<IActionResult> DeleteInstructor(int id)
        {
            if (_context.Instructors == null)
            {
                return NotFound();
            }
            var instructor = await _context.Instructors.FindAsync(id);
            if (instructor == null)
            {
                return NotFound();
            }

            _context.Instructors.Remove(instructor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InstructorExists(int id)
        {
            return (_context.Instructors?.Any(e => e.InstructorId == id)).GetValueOrDefault();
        }
    }
}
