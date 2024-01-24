using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;
using DAO;

namespace Repository
{
    public class AccountRepository : IAccountRepository
    {
        public void DeleteAccount(Account account) => AccountDAO.DeleteAccount(account);

        public List<Account> GetAccount() => AccountDAO.GetAccount();

        public Account GetAccountByID(int id)
        {
            Account account = new Account();
            account = AccountDAO.GetAccount().SingleOrDefault(p => p.AccountId == id);
            return account;
        }

        public Account GetAccountByEmail(string email)
        {
            Account account = new Account();
            account = AccountDAO.GetAccount().SingleOrDefault(p => p.Email == email);
            return account;
        }

        public void SaveAccount(Account account) => AccountDAO.SaveAccount(account);

        public void UpdateAccount(Account account) => AccountDAO.UpdateAccount(account);
    }
}
