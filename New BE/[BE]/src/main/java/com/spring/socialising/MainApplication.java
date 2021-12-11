package com.spring.socialising;

import com.spring.socialising.entities.Account;
import com.spring.socialising.entities.EmployeeEntity;
import com.spring.socialising.repositories.AccountRepository.AccountRepository;
import com.spring.socialising.repositories.EmployeeRepository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class MainApplication implements CommandLineRunner {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public static void main(String[] args) {
        SpringApplication.run(MainApplication.class, args);
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if(employeeRepository.count() == 0){
            Account accountAdmin = new Account();
            accountAdmin.setUsername("admin");
            accountAdmin.setPassword("123456");
            accountAdmin.set_active(true);
            accountAdmin.setRole("ADMIN");
            accountRepository.save(accountAdmin);

            EmployeeEntity employeeEntity = new EmployeeEntity();
            employeeEntity.setEmail("admin@gmail.com");
            employeeEntity.setDob(LocalDateTime.now());
            employeeEntity.setAddress("address admin");
            employeeEntity.setFirst_name("admin");
            employeeEntity.setRole("ADMIN");
            employeeEntity.setId_account(accountAdmin.getId());
            employeeEntity.setLast_name("name");
            employeeEntity.setPhone_number("0123456789");
            employeeEntity.setSex(true);
            employeeRepository.save(employeeEntity);

        }
    }

}
