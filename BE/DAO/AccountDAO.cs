using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;

namespace DAO
{
    public class AccountDAO
    {
        public static List<Account> GetAccount()
        {
            var listAccount = new List<Account>();
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    listAccount = context.Accounts.ToList();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return listAccount;
        }

        public static void SaveAccount(Account account)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.Accounts.Add(account);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void UpdateAccount(Account account)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.Entry<Account>(account).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void DeleteAccount(Account account)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    var deleteAccount = context.Accounts.SingleOrDefault(c => c.AccountId == account.AccountId);
                    context.Accounts.Remove(deleteAccount);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}
