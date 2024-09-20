package com.abcrestaurant.Backend.service;

import com.abcrestaurant.Backend.entity.Category;
import com.abcrestaurant.Backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private static final String IMAGE_DIR = "uploads/images/";

    @Autowired
    private CategoryRepository categoryRepository;

    public String saveImage(MultipartFile image) throws IOException {
        Path imagePath = Paths.get(IMAGE_DIR + image.getOriginalFilename());
        Files.createDirectories(imagePath.getParent());
        Files.write(imagePath, image.getBytes());
        return image.getOriginalFilename();
    }

    public Category createCategory(String categoryName, String imagePath) {
        Category category = new Category();
        category.setCategoryName(categoryName);
        category.setImageUrl(imagePath);
        return categoryRepository.save(category);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        return category.orElse(null);
    }

    public Category updateCategory(Long id, String categoryName, String imagePath) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
            category.setCategoryName(categoryName);
            if (imagePath != null) {
                category.setImageUrl(imagePath);
            }
            return categoryRepository.save(category);
        }
        return null;
    }
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}