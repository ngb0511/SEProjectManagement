using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repository;
using Entity;
using DAO;
using System.Globalization;
using Microsoft.AspNetCore.Components.Forms;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SEProjectManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterCalendarController : ControllerBase
    {
        private static IRegisterCalendarRepository repository = new RegisterCalendarRepository();
        private static SEProjectManagementContext _context = new SEProjectManagementContext();
        //private readonly IMailServiceRepository _mailService;

        // GET: api/<RegisterCalendarController>
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<RegisterCalendar>>> GetRegisterCalendars()
        {
            var listRegisterCalendar = repository.GetRegisterCalendar();

            if (listRegisterCalendar == null)
            {
                return NotFound();
            }
            return listRegisterCalendar;
        }

        [HttpGet("CheckRegisterCalendar/{id}")]
        public async Task<ActionResult<bool>> CheckRegisterCalendar(int id)
        {
            return RegisterCalendarExists(id);
        }

        [HttpGet("GetNewestRegisterCalendar")]
        public async Task<ActionResult<RegisterCalendar>> GetNewestRegisterCalendar()
        {
            var listRegisterCalendar = repository.GetRegisterCalendar();

            RegisterCalendar RegisterCalendar = listRegisterCalendar.MaxBy(p => p.Rcid);

            if (RegisterCalendar == null)
            {
                return NotFound();
            }
            return RegisterCalendar;
        }


        // POST api/<RegisterCalendarController>
        [HttpPost("AddRegisterCalendar")]
        public async Task<ActionResult<RegisterCalendar>> PostRegisterCalendar(RegisterCalendar registerCalendar)
        {
            if (registerCalendar == null)
            {
                return BadRequest();
      }
            _context.RegisterCalendars.Add(registerCalendar);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PostRegisterCalendar", new { id = registerCalendar.Rcid }, registerCalendar);
        }

        // PUT: api/RegisterCalendar/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("UpdateRegisterCalendar/{id}")]
        public async Task<IActionResult> PutRegisterCalendar(int id, RegisterCalendar registerCalendar)
        {
            if (id != registerCalendar.Rcid)
            {
                return BadRequest();
            }

            _context.Entry(registerCalendar).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegisterCalendarExists(id))
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

        // DELETE api/<RegisterCalendarController>/5
        [HttpDelete("DeleteRegisterCalendar/{id}")]
        public async Task<IActionResult> DeleteRegisterCalendar(int id)
        {
            if (_context.RegisterCalendars == null)
            {
                return NotFound();
            }
            var registerCalendar = await _context.RegisterCalendars.FindAsync(id);
            if (registerCalendar == null)
            {
                return NotFound();
            }

            _context.RegisterCalendars.Remove(registerCalendar);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("DeleteAll/{id}")]
        public async Task<IActionResult> DeleteAll(int id)
        {
            var listRegisterCalendar = repository.GetRegisterCalendar();

            if (listRegisterCalendar == null)
            {
                return NoContent();
            }

            for (int i = 0; i < listRegisterCalendar.Count; i++)
            {
                var RegisterCalendar = await _context.RegisterCalendars.FindAsync(listRegisterCalendar[i].Rcid);
                if (RegisterCalendar == null)
                {
                    return NotFound();
                }

                _context.RegisterCalendars.Remove(RegisterCalendar);
                await _context.SaveChangesAsync();
            }

            return NoContent();
        }

        private bool RegisterCalendarExists(int id)
        {
            return (_context.RegisterCalendars?.Any(e => e.Rcid == id)).GetValueOrDefault();
        }
    }
}
