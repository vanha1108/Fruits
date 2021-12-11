package com.spring.socialising.services.AccountService;

import com.spring.socialising.entities.Account;

public interface AccountService {
    Account findAccountByUserName(String username);
    Account addAccount(Account account);
}
