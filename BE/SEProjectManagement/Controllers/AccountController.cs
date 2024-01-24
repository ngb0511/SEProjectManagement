using Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repository;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SEProjectManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private static IAccountRepository repository = new AccountRepository();
        private static SEProjectManagementContext _context = new SEProjectManagementContext();

        // GET: api/<AccountController>
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Account>>> GetAccounts()
        {
            var listAccount = repository.GetAccount();

            if (listAccount == null)
            {
                return NotFound();
            }
            return listAccount;
        }

        // GET api/<AccountController>/5
        [HttpGet("GetAccountByID/{id}")] 
        public async Task<ActionResult<Account>> GetAccount(int id)
        {
            Account Account = repository.GetAccountByID(id);

            if (Account == null)
            {
                return NotFound();
            }
            return Account;
        }

        [HttpGet("GetAccountByEmail/{email}")]
        public async Task<ActionResult<Account>> GetAccountByEmail(string email)
        {
            Account Account = repository.GetAccountByEmail(email.ToLower());

            if (Account == null)
            {
                return NotFound();
            }
            return Account;
        }

        // POST api/<AccountController>
        [HttpPost("AddAccount")]
        public async Task<ActionResult<Account>> PostAccount(Account account)
        {
            if (account == null)
            {
                return BadRequest();
      }
            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            return CreatedAtAction("PostAccount", new { id = account.AccountId }, account);
        }

        [HttpPost("CheckAccount")]
        public async Task<ActionResult<bool>> CheckAccount(Account account)
        {
            if (!AccountExists(account.Email.ToLower()))
            {
                return false;
            }

            if (!CheckPwd(account.Email, account.Pwd))
            {
                return false;
            }

            return true;
        }

        // PUT: api/Account/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("UpdateAccount/{id}")]
        public async Task<IActionResult> PutAccount(int id, Account account)
        {
            if (id != account.AccountId)
            {
                return BadRequest();
            }

            _context.Entry(account).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(account.Email.ToLower()))
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

        // DELETE api/<AccountController>/5
        [HttpDelete("DeleteAccount/{id}")]
        public async Task<IActionResult> DeleteAccount(int id)
        {
            if (_context.Accounts == null)
            {
                return NotFound();
            }
            var accountType = await _context.Accounts.FindAsync(id);
            if (accountType == null)
            {
                return NotFound();
            }

            _context.Accounts.Remove(accountType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AccountExists(string email)
        {
            return (_context.Accounts?.Any(e => e.Email == email.ToLower())).GetValueOrDefault();
        }

        private bool CheckPwd(string email, string pwd)
        {
            var bytes = System.Text.Encoding.UTF8.GetBytes(pwd);

            using (var hash = System.Security.Cryptography.SHA512.Create())
            {
                var hashedInputBytes = hash.ComputeHash(bytes);

                var hashedInputStringBuilder = new System.Text.StringBuilder(128);
                foreach (var b in hashedInputBytes)
                    hashedInputStringBuilder.Append(b.ToString("X2"));
                //return hashedInputStringBuilder.ToString().ToLower();

                Account account = repository.GetAccountByEmail(email.ToLower());
                if (account.Pwd == hashedInputStringBuilder.ToString().ToLower())
                {
                    return true;
                }
            }

            return false;
        }
    }
}
