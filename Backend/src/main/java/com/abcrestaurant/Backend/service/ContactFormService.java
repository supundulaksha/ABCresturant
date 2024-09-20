package com.abcrestaurant.Backend.service;

import com.abcrestaurant.Backend.entity.ContactForm;
import com.abcrestaurant.Backend.repository.ContactFormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactFormService {

    @Autowired
    private ContactFormRepository repository;

    public ContactForm save(ContactForm contactForm) {
        return repository.save(contactForm);
    }

    public List<ContactForm> getAll() {
        return repository.findAll();
    }
}