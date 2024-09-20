package com.abcrestaurant.Backend.service;

import com.abcrestaurant.Backend.entity.Facility;
import com.abcrestaurant.Backend.repository.FacilityRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FacilityService {

    private final FacilityRepository facilityRepository;

    public FacilityService(FacilityRepository facilityRepository) {
        this.facilityRepository = facilityRepository;
    }

    public Facility createFacility(String name, MultipartFile image) throws IOException {
        // Define the directory to save the images
        String uploadDir = "src/main/resources/static/images/";
        Path uploadPath = Paths.get(uploadDir);

        // Create directories if they do not exist
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Save the file on the server
        String fileName = image.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(image.getInputStream(), filePath);

        // Save the facility entity with the image path
        Facility facility = new Facility();
        facility.setName(name);
        facility.setImagePath("/images/" + fileName);  // Path to access the image

        return facilityRepository.save(facility);
    }
}
