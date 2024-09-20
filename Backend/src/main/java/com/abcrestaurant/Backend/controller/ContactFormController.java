package com.abcrestaurant.Backend.controller;

import com.abcrestaurant.Backend.entity.ContactForm;
import com.abcrestaurant.Backend.service.ContactFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class ContactFormController {

    @Autowired
    private ContactFormService service;

    @PostMapping
    public ResponseEntity<ContactForm> createContactForm(@RequestBody ContactForm contactForm) {
        ContactForm savedForm = service.save(contactForm);
        return ResponseEntity.ok(savedForm);
    }

    @GetMapping
    public ResponseEntity<List<ContactForm>> getAllContactForms() {
        List<ContactForm> forms = service.getAll();
        return ResponseEntity.ok(forms);
    }
}