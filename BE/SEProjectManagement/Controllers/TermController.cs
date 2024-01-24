using Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SEProjectManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TermController : ControllerBase
    {
        private static ITermRepository repository = new TermRepository();
        private static SEProjectManagementContext _context = new SEProjectManagementContext();

        // GET: api/<TermController>
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Term>>> GetTerms()
        {
            var listTerm = repository.GetTerm();

            if (listTerm == null)
            {
                return NotFound();
            }
            return listTerm;
        }

        // GET api/<TermController>/5
        [HttpGet("GetTermByID/{id}")]
        public async Task<ActionResult<Term>> GetTerm(int id)
        {
            Term Term = repository.GetTermByID(id);

            if (Term == null)
            {
                return NotFound();
            }
            return Term;
        }

        // POST api/<TermController>
        [HttpPost("AddTerm")]
        public async Task<ActionResult<Term>> PostTerm(Term term)
        {
            if (term == null)
            {
                return BadRequest();
      }
            _context.Terms.Add(term);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PostTerm", new { id = term.TermId }, term);
        }

        // PUT: api/Term/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("UpdateTerm/{id}")]
        public async Task<IActionResult> PutTerm(int id, Term term)
        {
            if (id != term.TermId)
            {
                return BadRequest();
            }

            _context.Entry(term).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TermExists(id))
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

        // DELETE api/<TermController>/5
        [HttpDelete("DeleteTerm/{id}")]
        public async Task<IActionResult> DeleteTerm(int id)
        {
            if (_context.Terms == null)
            {
                return NotFound();
            }
            var term = await _context.Terms.FindAsync(id);
            if (term == null)
            {
                return NotFound();
            }

            _context.Terms.Remove(term);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TermExists(int id)
        {
            return (_context.Terms?.Any(e => e.TermId == id)).GetValueOrDefault();
        }
    }
}
