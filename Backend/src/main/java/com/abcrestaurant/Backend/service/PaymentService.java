package com.abcrestaurant.Backend.service;

import com.abcrestaurant.Backend.entity.Payment;
import com.abcrestaurant.Backend.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id).orElse(null);
    }

    public Payment updatePayment(Long id, Payment updatedPayment) {
        return paymentRepository.findById(id)
                .map(payment -> {
                    payment.setStatus(updatedPayment.getStatus());
                    return paymentRepository.save(payment);
                })
                .orElse(null);
    }

    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }

}