package com.abcrestaurant.Backend.repository;

import com.abcrestaurant.Backend.entity.Facility;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacilityRepository extends JpaRepository<Facility, Long> {
}
