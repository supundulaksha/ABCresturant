package com.abcrestaurant.Backend.service;

import com.abcrestaurant.Backend.entity.Offer;
import com.abcrestaurant.Backend.repository.OfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class OfferService {

    private static final String IMAGE_DIR = "uploads/images/";

    @Autowired
    private OfferRepository offerRepository;

    // Method to save the image file
    public String saveImage(MultipartFile image) throws IOException {
        Path imagePath = Paths.get(IMAGE_DIR + image.getOriginalFilename());
        Files.createDirectories(imagePath.getParent());
        Files.write(imagePath, image.getBytes());
        return image.getOriginalFilename();
    }

    // Method to create a new offer
    public Offer createOffer(String name, String description, Double percentage, String imagePath) {
        Offer offer = new Offer(name, description, percentage, imagePath);
        return offerRepository.save(offer);
    }

    // Method to update an existing offer
    public Offer updateOffer(Long id, String name, String description, Double percentage, String imagePath) {
        Optional<Offer> optionalOffer = offerRepository.findById(id);
        if (optionalOffer.isPresent()) {
            Offer offer = optionalOffer.get();
            offer.setName(name);
            offer.setDescription(description);
            offer.setPercentage(percentage);
            if (imagePath != null) {
                offer.setImageUrl(imagePath);
            }
            return offerRepository.save(offer);
        }
        return null;
    }

    // Method to get all offers
    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
    }

    // Method to delete an offer by ID
    public void deleteOffer(Long id) {
        offerRepository.deleteById(id);
    }
}
