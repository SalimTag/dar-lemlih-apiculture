package com.darlemlih.apiculture.repositories;

import com.darlemlih.apiculture.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findBySlug(String slug);
    Optional<Product> findBySku(String sku);
    
    @Query("SELECT p FROM Product p WHERE " +
           "(:search IS NULL OR LOWER(p.nameFr) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(p.nameEn) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(p.nameAr) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "AND (:categoryId IS NULL OR p.category.id = :categoryId) " +
           "AND (:minPrice IS NULL OR p.price >= :minPrice) " +
           "AND (:maxPrice IS NULL OR p.price <= :maxPrice) " +
           "AND p.isActive = true")
    Page<Product> searchProducts(@Param("search") String search,
                                @Param("categoryId") Long categoryId,
                                @Param("minPrice") BigDecimal minPrice,
                                @Param("maxPrice") BigDecimal maxPrice,
                                Pageable pageable);
    
    Page<Product> findByIsActiveTrue(Pageable pageable);
    Page<Product> findByIsFeaturedTrueAndIsActiveTrue(Pageable pageable);
}
