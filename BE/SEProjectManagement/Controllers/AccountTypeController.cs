using Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SEProjectManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountTypeController : ControllerBase
    {
        private static IAccountTypeRepository repository = new AccountTypeRepository();
        private static SEProjectManagementContext _context = new SEProjectManagementContext();

        // GET: api/<AccountTypeController>
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<AccountType>>> GetAccountTypes()
        {
            var listAccountType = repository.GetAccountType();

            if (listAccountType == null)
            {
                return NotFound();
            }
            return listAccountType;
        }

        // GET api/<AccountTypeController>/5
        [HttpGet("GetAccountTypeByID/{id}")]
        public async Task<ActionResult<AccountType>> GetAccountType(int id)
        {
            AccountType AccountType = repository.GetAccountTypeByID(id);

            if (AccountType == null)
            {
                return NotFound();
            }
            return AccountType;
        }

        // POST api/<AccountTypeController>
        [HttpPost("AddAccountType")]
        public async Task<ActionResult<AccountType>> PostAccountType(AccountType accountType)
        {
            if (accountType == null)
            {
                return BadRequest();
      }
            _context.AccountTypes.Add(accountType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAccountType", new { id = accountType.AccountTypeId }, accountType);
        }

        // PUT: api/AccountType/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("UpdateAccountType/{id}")]
        public async Task<IActionResult> PutAccountType(int id, AccountType accountType)
        {
            if (id != accountType.AccountTypeId)
            {
                return BadRequest();
            }

            _context.Entry(accountType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountTypeExists(id))
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

        // DELETE api/<AccountTypeController>/5
        [HttpDelete("DeleteAccontType/{id}")]
        public async Task<IActionResult> DeleteAccountType(int id)
        {
            if (_context.AccountTypes == null)
            {
                return NotFound();
            }
            var accountType = await _context.AccountTypes.FindAsync(id);
            if (accountType == null)
            {
                return NotFound();
            }

            _context.AccountTypes.Remove(accountType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AccountTypeExists(int id)
        {
            return (_context.AccountTypes?.Any(e => e.AccountTypeId == id)).GetValueOrDefault();
        }
    }
}
