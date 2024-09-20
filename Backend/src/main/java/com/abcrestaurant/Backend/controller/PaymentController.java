package com.abcrestaurant.Backend.controller;

import com.abcrestaurant.Backend.entity.Payment;
import com.abcrestaurant.Backend.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<Payment> createPayment(@RequestBody Payment payment) {
        Payment newPayment = paymentService.savePayment(payment);
        return ResponseEntity.ok(newPayment);
    }

    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments() {
        List<Payment> payments = paymentService.getAllPayments();
        return ResponseEntity.ok(payments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable Long id) {
        Payment payment = paymentService.getPaymentById(id);
        if (payment != null) {
            return ResponseEntity.ok(payment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Payment> updatePayment(@PathVariable Long id, @RequestBody Payment updatedPayment) {
        Payment payment = paymentService.updatePayment(id, updatedPayment);
        if (payment != null) {
            String status = payment.getStatus().toLowerCase();
            String subject = "";
            String body = "";

            switch (status) {
                case "confirmed":
                    subject = "Order Confirmed";
                    body = String.format(
                            "Dear %s,\n\n" +
                                    "We are delighted to inform you that your order has been confirmed!\n\n" +
                                    "Order Details:\n" +
                                    "Menu Item: %s\n" +
                                    "Quantity: %d\n" +
                                    "Total Amount: $%.2f\n\n" +
                                    "Thank you for choosing us. We are currently processing your order and will notify you once it's on its way.\n\n" +
                                    "If you have any questions or need further assistance, feel free to reply to this email or contact our support team.\n\n" +
                                    "Warm regards,\n" +
                                    "The [ABC RESTURANT] Team\n" +
                                    "Visit us at: [ABC WEBSITE]",
                            payment.getUsername(),
                            payment.getItemName(),
                            payment.getItemQuantity(),
                            payment.getTotalPrice()
                    );
                    break;
                case "canceled":
                    subject = "Order Canceled";
                    body = String.format(
                            "Dear %s,\n\n" +
                                    "We regret to inform you that your recent order has been canceled.\n\n" +
                                    "Order Details:\n" +
                                    "Menu Item: %s\n" +
                                    "Quantity: %d\n" +
                                    "Total Amount: $%.2f\n\n" +
                                    "We apologize for any inconvenience this may have caused. If you have any questions or need assistance with a new order, please contact our support team.\n\n" +
                                    "Thank you for your understanding.\n\n" +
                                    "Best wishes,\n" +
                                    "The [ABC RESTURANT] Team\n" +
                                    "Visit us at: [ABC WEBSITE]",
                            payment.getUsername(),
                            payment.getItemName(),
                            payment.getItemQuantity(),
                            payment.getTotalPrice()
                    );
                    break;
                // Add more cases if needed
            }

            if (!subject.isEmpty() && !body.isEmpty()) {
                sendStatusEmail(payment, subject, body);
            }

            return ResponseEntity.ok(payment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        paymentService.deletePayment(id);
        return ResponseEntity.noContent().build();
    }

    private void sendStatusEmail(Payment payment, String subject, String body) {
        // Replace with actual email field from Payment or user
        String recipientEmail = payment.getEmail();
        emailService.sendSimpleMessage(recipientEmail, subject, body);
    }
}