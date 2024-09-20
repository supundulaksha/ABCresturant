package com.abcrestaurant.Backend.service;

import com.abcrestaurant.Backend.entity.Staff;
import com.abcrestaurant.Backend.exception.ResourceNotFoundException;
import com.abcrestaurant.Backend.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StaffService {

    @Autowired
    private StaffRepository staffRepository;

    public Staff createStaff(Staff staff) {
        if (staffRepository.findByEmail(staff.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }
        return staffRepository.save(staff);
    }

    public Staff updateStaff(Long id, Staff updatedStaff) {
        Staff existingStaff = staffRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found"));

        // Check if the new email is used by another staff member
        if (staffRepository.findByEmail(updatedStaff.getEmail())
                .filter(staff -> !staff.getId().equals(id))
                .isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }

        // Update fields
        existingStaff.setName(updatedStaff.getName());
        existingStaff.setEmail(updatedStaff.getEmail());
        existingStaff.setPhone(updatedStaff.getPhone());
        existingStaff.setPassword(updatedStaff.getPassword());
        existingStaff.setNic(updatedStaff.getNic());

        return staffRepository.save(existingStaff);
    }

    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    public void deleteStaff(Long id) {
        if (!staffRepository.existsById(id)) {
            throw new ResourceNotFoundException("Staff not found");
        }
        staffRepository.deleteById(id);
    }

    public Staff authenticate(String email, String password) {
        Staff staff = staffRepository.findByEmail(email)
                .filter(s -> s.getPassword().equals(password))
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        return staff;
    }
}