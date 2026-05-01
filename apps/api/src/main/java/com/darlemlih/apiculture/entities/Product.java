package com.darlemlih.apiculture.entities;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product extends BaseEntity {
    
    @Column(nullable = false, unique = true)
    private String sku;
    
    @Column(nullable = false, unique = true)
    private String slug;
    
    @Column(nullable = false)
    private String nameFr;
    
    @Column(nullable = false)
    private String nameEn;
    
    @Column(nullable = false)
    private String nameAr;
    
    @Column(columnDefinition = "TEXT")
    private String descriptionFr;
    
    @Column(columnDefinition = "TEXT")
    private String descriptionEn;
    
    @Column(columnDefinition = "TEXT")
    private String descriptionAr;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;
    
    @Column(nullable = false)
    private String currency = "MAD";
    
    @Column(nullable = false)
    private Integer stockQuantity = 0;
    
    private Integer weightGrams;
    
    @Column(columnDefinition = "TEXT")
    private String ingredients;
    
    private String origin;
    
    @Column(nullable = false)
    private Boolean isHalal = true;
    
    @Column(nullable = false)
    private Boolean isActive = true;
    
    @Column(nullable = false)
    private Boolean isFeatured = false;
    
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url")
    private List<String> images = new ArrayList<>();
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CartItem> cartItems = new ArrayList<>();
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> orderItems = new ArrayList<>();
}
