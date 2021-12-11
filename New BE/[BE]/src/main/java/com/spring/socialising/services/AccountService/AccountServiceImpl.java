package com.spring.socialising.services.AccountService;

import com.spring.socialising.entities.Account;
import com.spring.socialising.repositories.AccountRepository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    private AccountRepository accountRepository;
    @Override
    public Account findAccountByUserName(String username) {
        return accountRepository.findAccountByUsername(username);
    }

    @Override
    public Account addAccount(Account account) {
        return accountRepository.save(account);
    }
}
