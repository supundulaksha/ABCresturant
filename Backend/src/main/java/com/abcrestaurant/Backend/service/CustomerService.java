package com.abcrestaurant.Backend.service;

import com.abcrestaurant.Backend.entity.Customer;
import com.abcrestaurant.Backend.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public Customer registerCustomer(Customer customer) {

        if (customerRepository.findByEmail(customer.getEmail()) != null) {
            throw new RuntimeException("Email is already in use!");
        }
        if (customerRepository.findByPhoneNumber(customer.getPhoneNumber()) != null) {
            throw new RuntimeException("Phone number is already in use!");
        }

        return customerRepository.save(customer);
    }

    public Customer loginCustomer(String email, String password) {
        Customer customer = customerRepository.findByEmail(email);

        if (customer != null && customer.getPassword().equals(password)) {
            return customer;
        } else {
            throw new RuntimeException("Invalid email or password!");
        }
    }
}
