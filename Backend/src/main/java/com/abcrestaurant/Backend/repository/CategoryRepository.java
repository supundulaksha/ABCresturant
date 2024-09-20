package com.abcrestaurant.Backend.repository;

import com.abcrestaurant.Backend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}