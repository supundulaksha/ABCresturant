package com.abcrestaurant.Backend.repository;

import com.abcrestaurant.Backend.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByEmail(String email);
    Customer findByPhoneNumber(String phoneNumber);
}
