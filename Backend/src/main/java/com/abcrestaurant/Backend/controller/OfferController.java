package com.abcrestaurant.Backend.controller;

import com.abcrestaurant.Backend.entity.Offer;
import com.abcrestaurant.Backend.service.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/offers")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class OfferController {

    @Autowired
    private OfferService offerService;

    // Get all offers
    @GetMapping
    public ResponseEntity<List<Offer>> getAllOffers() {
        List<Offer> offers = offerService.getAllOffers();
        return ResponseEntity.ok(offers);
    }

    // Create a new offer
    @PostMapping
    public ResponseEntity<Offer> createOffer(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("percentage") Double percentage,
            @RequestParam("image") MultipartFile image) {

        try {
            String imagePath = offerService.saveImage(image);
            Offer offer = offerService.createOffer(name, description, percentage, imagePath);
            return ResponseEntity.ok(offer);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Update an offer
    @PutMapping("/{id}")
    public ResponseEntity<Offer> updateOffer(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("percentage") Double percentage,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        try {
            String imagePath = null;
            if (image != null) {
                imagePath = offerService.saveImage(image);
            }
            Offer updatedOffer = offerService.updateOffer(id, name, description, percentage, imagePath);
            return ResponseEntity.ok(updatedOffer);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Delete an offer
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOffer(@PathVariable Long id) {
        offerService.deleteOffer(id);
        return ResponseEntity.noContent().build();
    }
}
