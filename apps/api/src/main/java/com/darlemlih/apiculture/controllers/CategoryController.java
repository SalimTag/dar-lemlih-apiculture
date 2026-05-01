package com.darlemlih.apiculture.controllers;

import com.darlemlih.apiculture.dto.category.CategoryDto;
import com.darlemlih.apiculture.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<CategoryDto>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllActiveCategories());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<CategoryDto> getCategoryBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(categoryService.getCategoryBySlug(slug));
    }
}
