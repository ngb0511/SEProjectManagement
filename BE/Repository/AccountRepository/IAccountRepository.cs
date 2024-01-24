using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;

namespace Repository
{
    public interface IAccountRepository
    {
        public List<Account> GetAccount();

        public Account GetAccountByID(int id);

        public Account GetAccountByEmail(string email);

        public void SaveAccount(Account accountType);

        public void UpdateAccount(Account accountType);

        public void DeleteAccount(Account accountType);
    }
}
