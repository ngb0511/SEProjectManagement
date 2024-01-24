using Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SEProjectManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private static IProjectRepository repository = new ProjectRepository();
        private static SEProjectManagementContext _context = new SEProjectManagementContext();

        // GET: api/<ProjectController>
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetProjects()
        {
            var result = from project in _context.Projects
                         join Subject in _context.Subjects on project.SubjectId equals Subject.SubjectId
                         join Instructor in _context.Instructors on project.InstructorId equals Instructor.InstructorId
                         select new
                         {
                             ProjectId = project.ProjectId,
                             ProjectName = project.ProjectName,
                             Request = project.Request,
                             Description = project.Description,
                             Point = project.Point,
                             Semester = project.Semester,
                             Year = project.Year,
                             Student1Id = project.Student1Id,
                             Student2Id = project.Student2Id,
                             InstructorId = project.InstructorId,
                             IName = Instructor.IName,
                             SubjectId = project.SubjectId,
                             SubjectName = Subject.SubjectName,
                             Status = project.Status
                         };
            return Ok(result);
        }

        // GET api/<ProjectController>/5
        [HttpGet("GetProjectByID/{id}")]
        public async Task<IActionResult> GetProject(int id)
        {
            var result = from project in _context.Projects
                         join Subject in _context.Subjects on project.SubjectId equals Subject.SubjectId
                         join Instructor in _context.Instructors on project.InstructorId equals Instructor.InstructorId
                         select new
                         {
                             ProjectId = project.ProjectId,
                             ProjectName = project.ProjectName,
                             Request = project.Request,
                             Description = project.Description,
                             Point = project.Point,
                             Semester = project.Semester,
                             Year = project.Year,
                             Student1Id = project.Student1Id,
                             Student2Id = project.Student2Id,
                             InstructorId = project.InstructorId,
                             IName = Instructor.IName,
                             SubjectId = project.SubjectId,
                             SubjectName = Subject.SubjectName,
                             Status = project.Status
                         };
            var resultByID = result.Where(e => (e.ProjectId == id));
            return Ok(resultByID);
        }

        [HttpGet("GetProjectForInstructor")]
        public async Task<IActionResult> GetProjectForInstructor([FromQuery] int semester, int year, int instructorId)
        {
            var result = from Project in _context.Projects
                         join Subject in _context.Subjects on Project.SubjectId equals Subject.SubjectId
                         join Instructor in _context.Instructors on Project.InstructorId equals Instructor.InstructorId
                         select new
                         {
                             ProjectId = Project.ProjectId,
                             ProjectName = Project.ProjectName,
                             Request = Project.Request,
                             Description = Project.Description,
                             Point = Project.Point,
                             Semester = Project.Semester,
                             Year = Project.Year,
                             Student1Id = Project.Student1Id,
                             Student2Id = Project.Student2Id,
                             InstructorId = Project.InstructorId,
                             IName = Instructor.IName,
                             SubjectId = Project.SubjectId,
                             SubjectName = Subject.SubjectName,
                             Status = Project.Status
                         };
            var resultByID = result.Where(e => ((e.Semester == semester) && (e.Year == year) && (e.InstructorId == instructorId)));
            return Ok(resultByID);
        }

    [HttpGet("GetProjectsByYearAndSemesterAndSubject")]
    public async Task<IActionResult> GetProjectsByYearAndSemester([FromQuery] int semester, int year, int subjectID)
    {
      var result = from Project in _context.Projects
                   join Subject in _context.Subjects on Project.SubjectId equals Subject.SubjectId
                   join Instructor in _context.Instructors on Project.InstructorId equals Instructor.InstructorId
                   select new
                   {
                     ProjectId = Project.ProjectId,
                     ProjectName = Project.ProjectName,
                     Request = Project.Request,
                     Description = Project.Description,
                     Point = Project.Point,
                     Semester = Project.Semester,
                     Year = Project.Year,
                     Student1Id = Project.Student1Id,
                     Student2Id = Project.Student2Id,
                     InstructorId = Project.InstructorId,
                     IName = Instructor.IName,
                     SubjectId = Project.SubjectId,
                     SubjectName = Subject.SubjectName,
                     Status = Project.Status
                   };
      var resultByID = result.Where(e => ((e.Semester == semester) && (e.Year == year) && (e.SubjectId == subjectID)));
      return Ok(resultByID);
    }

    [HttpGet("GetYearOfProject")]
    public async Task<IActionResult> GetYearOfProject()
    {
      //var listProject = repository.GetProject();

      var result = from Project in _context.Projects
                   select new
                   {
                     Year = Project.Year
                   };
      var resultByID = result.GroupBy(e => e.Year).Select(grp => grp.First());
      return Ok(resultByID);
    }

    [HttpGet("GetSemesterOfProject")]
    public async Task<IActionResult> GetSemesterOfProject()
    {
      //var listProject = repository.GetProject();
      var result = from Project in _context.Projects
                   select new
                   {
                     Semester = Project.Semester
                   };
      var resultByID = result.GroupBy(e => e.Semester).Select(grp => grp.First());
      return Ok(resultByID);
    }

    [HttpGet("GetCurrentProject/{id}")]
        public async Task<ActionResult<Project>> GetCurrentProject(int id)
        {
            var listProject = repository.GetProjectByStudentID(id);

            Project Project = listProject.MaxBy(p => p.ProjectId);

            if (Project == null)
            {
                return NotFound();
            }
            return Project;
        }

        [HttpGet("CheckProjectExist/{id}")]
        public async Task<ActionResult<bool>> CheckProjectExist(int id)
        {
            return CheckExists(id);
        }

        [HttpGet("GetProjectByStudentID/{id}")]
        public async Task<IActionResult> GetProjectByStudentID(int id)
        {
            var result = from project in _context.Projects
                         join Subject in _context.Subjects on project.SubjectId equals Subject.SubjectId
                         join Instructor in _context.Instructors on project.InstructorId equals Instructor.InstructorId
                         select new
                         {
                             ProjectId = project.ProjectId,
                             ProjectName = project.ProjectName,
                             Request = project.Request,
                             Description = project.Description,
                             Point = project.Point,
                             Semester = project.Semester,
                             Year = project.Year,
                             Student1Id = project.Student1Id,
                             Student2Id = project.Student2Id,
                             InstructorId = project.InstructorId,
                             IName = Instructor.IName,
                             SubjectId = project.SubjectId,
                             SubjectName = Subject.SubjectName,
                             Status = project.Status
                         };
            var resultByID = result.Where(e => (e.Student1Id == id || e.Student2Id == id));
            return Ok(resultByID);
        }

        [HttpGet("GetProjectByInstructorID/{id}")]
        public async Task<IActionResult> GetProjectByInstructorID(int id)
        {
            var result = from project in _context.Projects
                         join Subject in _context.Subjects on project.SubjectId equals Subject.SubjectId
                         join Instructor in _context.Instructors on project.InstructorId equals Instructor.InstructorId
                         select new
                         {
                             ProjectId = project.ProjectId,
                             ProjectName = project.ProjectName,
                             Request = project.Request,
                             Description = project.Description,
                             Point = project.Point,
                             Semester = project.Semester,
                             Year = project.Year,
                             Student1Id = project.Student1Id,
                             Student2Id = project.Student2Id,
                             InstructorId = project.InstructorId,
                             IName = Instructor.IName,
                             SubjectId = project.SubjectId,
                             SubjectName = Subject.SubjectName,
                             Status = project.Status
                         };
            var resultByID = result.Where(e => (e.InstructorId == id));
            return Ok(resultByID);
        }

        // POST api/<ProjectController>
        [HttpPost("AddProject")]
        public async Task<ActionResult<Project>> PostProject(Project project)
        {
            if (project == null)
            {
                return BadRequest();
      }
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PostProject", new { id = project.ProjectId }, project);
        }

        // PUT: api/Project/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("UpdateProject/{id}")]
        public async Task<IActionResult> PutProject(int id, Project updatedProject)
        {
            if (id != updatedProject.ProjectId)
            {
                return BadRequest();
            }

            // Detach existing entity
            var existingProject = await _context.Projects.FindAsync(id);
            if (existingProject == null)
            {
                return NotFound();
            }

            _context.Entry(existingProject).State = EntityState.Detached;

            // Attach and mark as modified
            _context.Entry(updatedProject).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id))
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


        // DELETE api/<ProjectController>/5
        [HttpDelete("DeleteProject/{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            if (_context.Projects == null)
            {
                return NotFound();
            }
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProjectExists(int id)
        {
            return (_context.Projects?.Any(e => e.ProjectId == id)).GetValueOrDefault();
        }

        private bool CheckExists(int id)
        {
            return (_context.Projects?.Any(e => (e.Student1Id == id || e.Student2Id == id))).GetValueOrDefault();
        }
    }
}
