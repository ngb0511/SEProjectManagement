using Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SEProjectManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectProgressController : ControllerBase
    {
        private static IProjectProgressRepository repository = new ProjectProgressRepository();
        private static SEProjectManagementContext _context = new SEProjectManagementContext();

        // GET: api/<ProjectProgressController>
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<ProjectProgress>>> GetProjectProgresses()
        {
            var listProjectProgress = repository.GetProjectProgress();

            if (listProjectProgress == null)
            {
                return NotFound();
            }
            return listProjectProgress;
        }

        // GET api/<ProjectProgressController>/5
        [HttpGet("GetProjectProgressByID/{id}")]
        public async Task<ActionResult<ProjectProgress>> GetProjectProgress(int id)
        {
            ProjectProgress ProjectProgress = repository.GetProjectProgressByID(id);

            if (ProjectProgress == null)
            {
                return NotFound();
            }
            return ProjectProgress;
        }

        [HttpGet("GetProjectProgressByProjectID/{id}")]
        public async Task<ActionResult<IEnumerable<ProjectProgress>>> GetProjectProgressByProjectID(int id)
        {
            var listProgress = repository.GetProjectProgressByProjectID(id);

            if (listProgress == null)
            {
                return NotFound();
            }
            return listProgress;
            //return (_context.TopicRegisters?.Any(e => (e.Student1Id == id || e.Student2Id == id) && e.Status == "approved")).GetValueOrDefault();
        }

        // POST api/<ProjectProgressController>
        [HttpPost("AddProjectProgress")]
        public async Task<ActionResult<ProjectProgress>> PostProjectProgress(ProjectProgress projectProgress)
        {
            if (projectProgress == null)
            {
                return BadRequest();
      }
            _context.ProjectProgresses.Add(projectProgress);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PostProjectProgress", new { id = projectProgress.ProjectId }, projectProgress);
        }

        // PUT: api/ProjectProgress/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("UpdateProjectProgress/{id}")]
        public async Task<IActionResult> PutProjectProgress(int id, ProjectProgress projectProgress)
        {
            if (id != projectProgress.ProjectId)
            {
                return BadRequest();
            }

            _context.Entry(projectProgress).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectProgressExists(id))
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

        // DELETE api/<ProjectProgressController>/5
        [HttpDelete("DeleteProjectProgress/{id}")]
        public async Task<IActionResult> DeleteProjectProgress(int id)
        {
            if (_context.ProjectProgresses == null)
            {
                return NotFound();
            }
            var projectProgress = await _context.ProjectProgresses.FindAsync(id);
            if (projectProgress == null)
            {
                return NotFound();
            }

            _context.ProjectProgresses.Remove(projectProgress);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProjectProgressExists(int id)
        {
            return (_context.ProjectProgresses?.Any(e => e.ProjectId == id)).GetValueOrDefault();
        }
    }
}
