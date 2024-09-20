package com.abcrestaurant.Backend.controller;

import com.abcrestaurant.Backend.entity.Facility;
import com.abcrestaurant.Backend.service.FacilityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/facilities")
@CrossOrigin(origins = "http://localhost:3000")
public class FacilityController {

    private final FacilityService facilityService;

    public FacilityController(FacilityService facilityService) {
        this.facilityService = facilityService;
    }

    @PostMapping("/upload")
    public ResponseEntity<Facility> createFacility(
            @RequestParam("name") String name,
            @RequestParam("image") MultipartFile image) throws IOException {

        Facility facility = facilityService.createFacility(name, image);
        return ResponseEntity.ok(facility);
    }
}
