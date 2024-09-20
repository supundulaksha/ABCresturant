package com.abcrestaurant.Backend.controller;

import com.abcrestaurant.Backend.entity.Category;
import com.abcrestaurant.Backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
//origin
@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }


    @PostMapping
    public ResponseEntity<Category> createCategory(
            @RequestParam("categoryName") String categoryName,
            @RequestParam("image") MultipartFile image) {

        try {
            String imagePath = categoryService.saveImage(image);
            Category category = categoryService.createCategory(categoryName, imagePath);
            return ResponseEntity.ok(category);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(
            @PathVariable Long id,
            @RequestParam("categoryName") String categoryName,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        try {
            String imagePath = null;
            if (image != null) {
                imagePath = categoryService.saveImage(image);
            }
            Category category = categoryService.updateCategory(id, categoryName, imagePath);
            return ResponseEntity.ok(category);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

}