package com.abcrestaurant.Backend.service;

import com.abcrestaurant.Backend.entity.Category;
import com.abcrestaurant.Backend.entity.Menu;
import com.abcrestaurant.Backend.repository.CategoryRepository;
import com.abcrestaurant.Backend.repository.MenuRepository;
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
public class MenuService {

    private static final String IMAGE_DIR = "uploads/images/";

    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public String saveImage(MultipartFile image) throws IOException {
        Path imagePath = Paths.get(IMAGE_DIR + image.getOriginalFilename());
        Files.createDirectories(imagePath.getParent());
        Files.write(imagePath, image.getBytes());
        return image.getOriginalFilename();
    }

    public Menu createMenu(String name, Double price, String description, List<String> ingredients, Long categoryId, String imagePath, Boolean offerStatus, Double offerClickPercentage, Double finalPrice) {
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();
            Menu menu = new Menu(name, price, description, imagePath, ingredients, category, offerStatus, offerClickPercentage, finalPrice);
            return menuRepository.save(menu);
        }
        return null;
    }

    public List<Menu> getAllMenus() {
        return menuRepository.findAll();
    }

    public Menu updateMenu(Long id, String name, Double price, String description, List<String> ingredients, Long categoryId, String imagePath, Boolean offerStatus, Double offerClickPercentage, Double finalPrice) {
        Optional<Menu> optionalMenu = menuRepository.findById(id);
        if (optionalMenu.isPresent()) {
            Menu menu = optionalMenu.get();
            menu.setName(name);
            menu.setPrice(price);
            menu.setDescription(description);
            menu.setIngredients(ingredients);

            if (categoryId != null) {
                Category category = categoryRepository.findById(categoryId).orElse(null);
                menu.setCategory(category);
            }

            if (imagePath != null) {
                menu.setImageUrl(imagePath);
            }

            if (offerStatus != null) {
                menu.setOfferStatus(offerStatus);
            }

            if (offerClickPercentage != null) {
                menu.setOfferClickPercentage(offerClickPercentage);
            }

            if (finalPrice != null) {
                menu.setFinalPrice(finalPrice);
            }

            return menuRepository.save(menu);
        }
        return null;
    }

    public void deleteMenu(Long id) {
        menuRepository.deleteById(id);
    }
}