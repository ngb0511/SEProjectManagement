using Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Repository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SEProjectManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectResourceController : ControllerBase
    {
        private static IProjectResourceRepository repository = new ProjectResourceRepository();
        private static SEProjectManagementContext _context = new SEProjectManagementContext();

        // GET: api/<ProjectResourceController>
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<ProjectResource>>> GetProjectResources()
        {
            var listProjectResource = repository.GetProjectResource();

            if (listProjectResource == null)
            {
                return NotFound();
            }
            return listProjectResource;
        }

        // GET api/<ProjectResourceController>/5
        [HttpGet("GetProjectResourceByID/{id}")]
        public async Task<IActionResult> GetProjectResource(int id)
        {
            var result = from projectResource in _context.ProjectResources
                         select new
                         {
                             ResourcesId = projectResource.ResourcesId,
                             ProjectId = projectResource.ProjectId,
                             ResourcesName = projectResource.ResourcesName,
                             filePath = projectResource.FilePath
                         };
            var resultByID = result.Where(e => (e.ProjectId == id));
            return Ok(resultByID);
        }

        [HttpGet("DownloadFile/{filename}")]
        public async Task<ActionResult<string>> DownloadFile(string filename)
        {
            var filepath = Path.Combine(Directory.GetCurrentDirectory(), "Files", filename);

            var provider = new FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(filepath, out var contenttype))
            {
                contenttype = "application/octet-stream";
            }

            var bytes = await System.IO.File.ReadAllBytesAsync(filepath);
            return File(bytes, contenttype, Path.GetFileName(filepath));
        }

        [HttpPost("UploadFile")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UploadFile(IFormFile file, CancellationToken cancellationtoken)
        {
            var result = await WriteFile(file);
            return Ok(result);
        }

        // POST api/<ProjectResourceController>
        [HttpPost("AddProjectResource")]
        public async Task<ActionResult<ProjectResource>> PostProjectResource(ProjectResource projectResource)
        {
            if (projectResource == null)
            {
                return BadRequest();
      }

            _context.ProjectResources.Add(projectResource);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PostProjectResource", new { id = projectResource.ResourcesId }, projectResource);
        }

        private async Task<string> WriteFile(IFormFile file)
        {
            string filename = "";
            try
            {
                var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
                filename = DateTime.Now.Ticks.ToString() + extension;

                var filepath = Path.Combine(Directory.GetCurrentDirectory(), "Files");

                if (!Directory.Exists(filepath))
                {
                    Directory.CreateDirectory(filepath);
                }

                var exactpath = Path.Combine(Directory.GetCurrentDirectory(), "Files", filename);
                using (var stream = new FileStream(exactpath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }
            catch (Exception ex)
            {
            }
            return filename;
        }

        // PUT: api/ProjectResource/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("UpdateProjectResource/{id}")]
        public async Task<IActionResult> PutProjectResource(int id, ProjectResource projectResource)
        {
            if (id != projectResource.ResourcesId)
            {
                return BadRequest();
            }

            _context.Entry(projectResource).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectResourceExists(id))
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

        // DELETE api/<ProjectResourceController>/5
        [HttpDelete("DeleteProjectResource/{id}")]
        public async Task<IActionResult> DeleteProjectResource(int id)
        {
            if (_context.ProjectResources == null)
            {
                return NotFound();
            }
            var projectResource = await _context.ProjectResources.FindAsync(id);
            if (projectResource == null)
            {
                return NotFound();
            }

            _context.ProjectResources.Remove(projectResource);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProjectResourceExists(int id)
        {
            return (_context.ProjectResources?.Any(e => e.ResourcesId == id)).GetValueOrDefault();
        }
    }
}
