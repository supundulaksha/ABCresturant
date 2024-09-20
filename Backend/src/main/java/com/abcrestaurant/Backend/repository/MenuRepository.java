package com.abcrestaurant.Backend.repository;

import com.abcrestaurant.Backend.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<Menu, Long> {
}
