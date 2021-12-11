package com.spring.socialising.services.CustomerService;

import com.spring.socialising.entities.CustomerEntity;
import com.spring.socialising.repositories.CustomerRepository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public CustomerEntity addCustomer(CustomerEntity customerEntity) {
        return customerRepository.save(customerEntity);
    }

    @Override
    public CustomerEntity findById(Long id) {
        Optional<CustomerEntity> customerEntity = customerRepository.findById(id);
        if(customerEntity.isPresent()){
            return customerEntity.get();
        }
        return null;
    }

    @Override
    public CustomerEntity findCustomerByPhoneNumber(String phoneNumber) {
        return customerRepository.findCustomerEntityByPhoneNumber(phoneNumber);
    }

    @Override
    public CustomerEntity findCustomerByEmail(String email) {
        return customerRepository.findCustomerEntityByEmail(email);
    }
}
