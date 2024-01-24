using System;
using System.Collections.Generic;

namespace Entity
{
    public partial class AccountType
    {
        public AccountType()
        {
            Accounts = new HashSet<Account>();
        }

        public int AccountTypeId { get; set; }
        public string? AccountTypeName { get; set; }
        public string? Permission { get; set; }

        public virtual ICollection<Account> Accounts { get; set; }
    }
}
