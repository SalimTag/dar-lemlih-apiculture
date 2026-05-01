package com.darlemlih.apiculture.controllers;

import com.darlemlih.apiculture.dto.product.ProductDto;
import com.darlemlih.apiculture.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<Page<ProductDto>> getProducts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            Pageable pageable) {
        return ResponseEntity.ok(productService.searchProducts(search, categoryId, minPrice, maxPrice, pageable));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ProductDto> getProductBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(productService.getProductBySlug(slug));
    }

    @GetMapping("/featured")
    public ResponseEntity<Page<ProductDto>> getFeaturedProducts(Pageable pageable) {
        return ResponseEntity.ok(productService.getFeaturedProducts(pageable));
    }
}
