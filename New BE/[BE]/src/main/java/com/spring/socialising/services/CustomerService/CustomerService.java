package com.spring.socialising.services.CustomerService;

import com.spring.socialising.entities.CustomerEntity;

public interface CustomerService {
    CustomerEntity addCustomer(CustomerEntity customerEntity);
    CustomerEntity findById(Long id);

    CustomerEntity findCustomerByPhoneNumber(String phoneNumber);
    CustomerEntity findCustomerByEmail(String email);
}
