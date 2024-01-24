using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entity;

namespace DAO
{
    public class AccountTypeDAO
    {
        public static List<AccountType> GetAccountType()
        {
            var listAccountType = new List<AccountType>();
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    listAccountType = context.AccountTypes.ToList();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return listAccountType;
        }

        public static void SaveAccountType(AccountType accountType)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.AccountTypes.Add(accountType);
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void UpdateAccountType(AccountType accountType)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    context.Entry<AccountType>(accountType).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static void DeleteAccountType(AccountType accountType)
        {
            try
            {
                using (var context = new SEProjectManagementContext())
                {
                    var deleteAccountType = context.AccountTypes.SingleOrDefault(c => c.AccountTypeId == accountType.AccountTypeId);
                    context.AccountTypes.Remove(deleteAccountType);
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
