package com.spring.socialising.controllers.client;

import com.spring.socialising.dtos.CustomerDTO;
import com.spring.socialising.entities.Account;
import com.spring.socialising.entities.CustomerEntity;
import com.spring.socialising.entities.response.ResponseData;
import com.spring.socialising.securities.JwtUserDetails;
import com.spring.socialising.services.AccountService.AccountService;
import com.spring.socialising.services.CustomerService.CustomerService;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/rest")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private AccountService accountService;

    @ApiOperation("User sign up information")
    @PostMapping("/signup-new")
    public ResponseEntity<ResponseData> signUpCustomer(@RequestBody CustomerDTO customerDTO) {
        //Validate account
        if (StringUtils.isEmpty(customerDTO.getUsername().replace(" ", "")) || StringUtils.isEmpty(customerDTO.getPassword().replace(" ", ""))) {
            return new ResponseEntity<>(
                    new ResponseData(false, "username and password is required!",
                            customerDTO), BAD_REQUEST);
        }

        Account account = accountService.findAccountByUserName(customerDTO.getUsername());
        if (account != null) {
            if (account.getPassword().equals(customerDTO.getPassword())) {
                return new ResponseEntity<>(
                        new ResponseData(false, "username already exits",
                                customerDTO), BAD_REQUEST);
            }
        }

        if (!StringUtils.isEmpty(customerDTO.getPhone_number())) {
            if (customerService.findCustomerByPhoneNumber(customerDTO.getPhone_number()) != null) {
                return new ResponseEntity<>(
                        new ResponseData(false, "phone number already exist on system",
                                customerDTO), BAD_REQUEST);
            }
        } else {
            if (customerService.findCustomerByPhoneNumber(customerDTO.getPhone_number()) != null) {
                return new ResponseEntity<>(
                        new ResponseData(false, "phone number is required",
                                customerDTO), BAD_REQUEST);
            }
        }

        if (!StringUtils.isEmpty(customerDTO.getEmail())) {
            if (customerService.findCustomerByEmail(customerDTO.getEmail()) != null) {
                return new ResponseEntity<>(
                        new ResponseData(false, "email already exist on system",
                                customerDTO), BAD_REQUEST);
            }
        }

        Account newAccount = new Account();
        newAccount.setRole("USER");
        newAccount.set_active(true);
        newAccount.setUsername(customerDTO.getUsername());
        newAccount.setPassword(customerDTO.getPassword());
        newAccount = accountService.addAccount(newAccount);

        CustomerEntity customer = new CustomerEntity();
        customer.setAddress(customerDTO.getAddress());
        customer.setRole("USER");
        customer.setEmail(customerDTO.getEmail());
        customer.setFirst_name(customerDTO.getFirst_name());
        customer.setLast_name(customerDTO.getLast_name());
        customer.setId_account(newAccount.getId());
        customer.setPhone_number(customer.getPhone_number());
        customer.setSex(customerDTO.isSex());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss a");
        LocalDateTime dateTime = LocalDateTime.parse(customerDTO.getDob() + " 00:00:00 AM", formatter);

        customer.setDob(dateTime);
        customerService.addCustomer(customer);

        return new ResponseEntity<>(
                new ResponseData(true, "User sign up successfully",
                        customerDTO), CREATED);
    }

    @ApiOperation("Get customer information")
    @GetMapping("/user/information")
    public ResponseEntity<ResponseData> getDetailInformation() {
        JwtUserDetails userDetails = (JwtUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        CustomerEntity customerEntity = customerService.findById(Long.parseLong(userDetails.getId()));

        return new ResponseEntity<>(
                new ResponseData(true, "User detail info",
                        customerEntity), OK);
    }
}
