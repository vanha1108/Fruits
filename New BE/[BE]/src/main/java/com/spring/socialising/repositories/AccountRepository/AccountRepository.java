package com.spring.socialising.repositories.AccountRepository;

import com.spring.socialising.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
  @Query(value="select AC from Account AC where AC.username=:username")
  Account findAccountByUsername(@Param("username") String username);
}
