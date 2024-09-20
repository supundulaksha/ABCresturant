package com.abcrestaurant.Backend.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double price;
    private String description;
    private String imageUrl;
    private Boolean offerStatus;
    private Double offerClickPercentage;
    private Double finalPrice;
    @ElementCollection
    private List<String> ingredients;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    // Default constructor
    public Menu() {}

    // Parameterized constructor
    public Menu(String name, Double price, String description, String imageUrl, List<String> ingredients, Category category, Boolean offerStatus, Double offerClickPercentage, Double finalPrice) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.ingredients = ingredients;
        this.category = category;
        this.offerStatus = offerStatus;
        this.offerClickPercentage = offerClickPercentage;
        this.finalPrice = finalPrice;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Boolean getOfferStatus() {
        return offerStatus;
    }

    public void setOfferStatus(Boolean offerStatus) {
        this.offerStatus = offerStatus;
    }

    public Double getOfferClickPercentage() {
        return offerClickPercentage;
    }

    public void setOfferClickPercentage(Double offerClickPercentage) {
        this.offerClickPercentage = offerClickPercentage;
    }

    public Double getFinalPrice() {
        return finalPrice;
    }

    public void setFinalPrice(Double finalPrice) {
        this.finalPrice = finalPrice;
    }
}