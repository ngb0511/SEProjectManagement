using Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SEProjectManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private static IStudentRepository repository = new StudentRepository();
        private static ICurrentSubjectRepository cSubjectRepository = new CurrentSubjectRepository();
        private static SEProjectManagementContext _context = new SEProjectManagementContext();

        // GET: api/<StudentController>
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
            var listStudent = repository.GetStudent();

            if (listStudent == null)
            {
                return NotFound();
            }
            return listStudent;
        }

        // GET api/<StudentController>/5
        [HttpGet("GetStudentByID/{id}")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            Student Student = repository.GetStudentByID(id);

            if (Student == null)
            {
                return NotFound();
            }
            return Student;
        }

        [HttpGet("GetStudentByAccount/{id}")]
        public async Task<ActionResult<Student>> GetStudentByAccount(int id)
        {
            Student Student = repository.GetStudentByAccount(id);

            if (Student == null)
            {
                return NotFound();
            }
            return Student;
        }

        [HttpGet("CheckStudentID/{id}")]
        public async Task<ActionResult<bool>> CheckStudentID(int id)
        {
            if (!StudentExists(id))
            {
                return false;
            }
            return true;
        }

        [HttpGet("GetCurrentSubject/{id}")]
        public async Task<ActionResult<int>> GetCurrentSubject(int id)
        {
            //int currentSubject = cSubjectRepository.GetCurrentSubjectByID(id).SubjectId;
            //if (!StudentExists(id))
            //{
            //    return false;
            //}
            return cSubjectRepository.GetCurrentSubjectByID(id).SubjectId; ;
        }

        // POST api/<StudentController>
        [HttpPost("AddStudent")]
        public async Task<ActionResult<Student>> PostStudent(Student student)
        {
            if (student == null)
            {
                return BadRequest();
      }
            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PostStudent", new { id = student.StudentId }, student);
        }

        // PUT: api/Student/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("UpdateStudent/{id}")]
        public async Task<IActionResult> PutStudent(int id, Student student)
        {

            var updatedStudent = _context.Students.First(s => s.StudentId == id);

            updatedStudent.SName = student.SName;
            updatedStudent.Gender = student.Gender;
            updatedStudent.Birth = student.Birth;
            updatedStudent.HomeTown = student.HomeTown;
            updatedStudent.Address = student.Address;
            updatedStudent.Email = student.Email;
            updatedStudent.PhoneNumber = student.PhoneNumber;

            _context.SaveChanges();

            return NoContent();
        }

        // DELETE api/<StudentController>/5
        [HttpDelete("DeleteStudent/{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            if (_context.Students == null)
            {
                return NotFound();
            }
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StudentExists(int id)
        {
            return (_context.Students?.Any(e => e.StudentId == id)).GetValueOrDefault();
        }
    }
}
