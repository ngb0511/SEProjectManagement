using Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Repository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SEProjectManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectDetailController : ControllerBase
    {
        private static IProjectDetailRepository repository = new ProjectDetailRepository();
        private static ITagRepository tagRepository = new TagRepository();
        private static IProjectRepository projectRepository = new ProjectRepository();
        private static SEProjectManagementContext _context = new SEProjectManagementContext();

        // GET: api/<ProjectDetailController>
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<ProjectDetail>>> GetProjectDetails()
        {
            var listProjectDetail = repository.GetProjectDetail();

            if (listProjectDetail == null)
            {
                return NotFound();
            }
            return listProjectDetail;
        }

        // GET api/<ProjectDetailController>/

        [HttpGet("GetProjectDetailByID/{id}")]
        public async Task<ActionResult<IEnumerable<ProjectDetail>>> GetProjectDetailByID(int id)
        {
            var listProjectDetail = repository.GetProjectDetailByID(id);

            if (listProjectDetail == null)
            {
                return NotFound();
            }
            return listProjectDetail;
            //return (_context.TopicRegisters?.Any(e => (e.Student1Id == id || e.Student2Id == id) && e.Status == "approved")).GetValueOrDefault();
        }

        [HttpGet("GetTagByProjectID/{id}")]
        public async Task<ActionResult<IEnumerable<Tag>>> GetTagByProjectID(int id)
        {
            var listProjectDetail = repository.GetProjectDetailByID(id);
            if (listProjectDetail == null)
            {
                return NotFound();
            }

            List<Tag> tags = new List<Tag>();

            for (int i = 0; i < listProjectDetail.Count; i++)
            {
                tags.Add(tagRepository.GetTagByID(listProjectDetail[i].TagId));
            }

            return tags;
            //return (_context.TopicRegisters?.Any(e => (e.Student1Id == id || e.Student2Id == id) && e.Status == "approved")).GetValueOrDefault();
        }

        // POST api/<ProjectDetailController>
        [HttpPost("AddProjectDetail")]
        public async Task<ActionResult<ProjectDetail>> PostProjectDetail(ProjectDetail projectDetail)
        {
            if (projectDetail == null)
            {
                return BadRequest();
      }
            _context.ProjectDetails.Add(projectDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PostProjectDetail", new { id = projectDetail.DetailId }, projectDetail);
        }

        // PUT: api/ProjectDetail/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("UpdateProjectDetail/{id}")]
        public async Task<IActionResult> PutProjectDetail(int id, ProjectDetail projectDetail)
        {
            if (id != projectDetail.ProjectId)
            {
                return BadRequest();
            }

            _context.Entry(projectDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectDetailExists(id))
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

        // DELETE api/<ProjectDetailController>/5
        [HttpDelete("DeleteProjectDetail/{id}")]
        public async Task<IActionResult> DeleteProjectDetail(int id)
        {
            if (_context.ProjectDetails == null)
            {
                return NotFound();
            }
            var projectDetail = await _context.ProjectDetails.FindAsync(id);
            if (projectDetail == null)
            {
                return NotFound();
            }

            _context.ProjectDetails.Remove(projectDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProjectDetailExists(int id)
        {
            return (_context.ProjectDetails?.Any(e => e.ProjectId == id)).GetValueOrDefault();
        }
    }
}
