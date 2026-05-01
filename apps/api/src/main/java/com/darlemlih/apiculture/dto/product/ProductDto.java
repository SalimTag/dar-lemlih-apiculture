package com.darlemlih.apiculture.dto.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
    private Long id;
    private String sku;
    private String slug;
    private String nameFr;
    private String nameEn;
    private String nameAr;
    private String descriptionFr;
    private String descriptionEn;
    private String descriptionAr;
    private BigDecimal price;
    private String currency;
    private Integer stockQuantity;
    private Integer weightGrams;
    private String ingredients;
    private String origin;
    private Boolean isHalal;
    private Boolean isActive;
    private Boolean isFeatured;
    private List<String> images;
    private Long categoryId;
    private String categoryName;
}
