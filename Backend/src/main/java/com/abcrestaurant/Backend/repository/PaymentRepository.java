package com.abcrestaurant.Backend.repository;

import com.abcrestaurant.Backend.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}