package com.darlemlih.apiculture.dto.category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDto {
    private Long id;
    private String slug;
    private String nameFr;
    private String nameEn;
    private String nameAr;
    private String descriptionFr;
    private String descriptionEn;
    private String descriptionAr;
    private String image;
    private Integer displayOrder;
    private Long productCount;
}
