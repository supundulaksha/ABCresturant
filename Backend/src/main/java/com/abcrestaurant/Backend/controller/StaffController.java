package com.abcrestaurant.Backend.controller;

import com.abcrestaurant.Backend.entity.Staff;
import com.abcrestaurant.Backend.exception.ResourceNotFoundException;
import com.abcrestaurant.Backend.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "http://localhost:3000")
public class StaffController {

    @Autowired
    private StaffService staffService;
//staff
    @PostMapping
    public ResponseEntity<?> createStaff(@RequestBody Staff staff) {
        try {
            Staff createdStaff = staffService.createStaff(staff);
            return new ResponseEntity<>(createdStaff, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<List<Staff>> getAllStaff() {
        List<Staff> staffList = staffService.getAllStaff();
        return new ResponseEntity<>(staffList, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateStaff(@PathVariable("id") Long id, @RequestBody Staff staff) {
        try {
            Staff updatedStaff = staffService.updateStaff(id, staff);
            return new ResponseEntity<>(updatedStaff, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStaff(@PathVariable("id") Long id) {
        try {
            staffService.deleteStaff(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Add a new endpoint for staff login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Staff staff) {
        try {
            Staff authenticatedStaff = staffService.authenticate(staff.getEmail(), staff.getPassword());
            return new ResponseEntity<>(authenticatedStaff, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }
}
