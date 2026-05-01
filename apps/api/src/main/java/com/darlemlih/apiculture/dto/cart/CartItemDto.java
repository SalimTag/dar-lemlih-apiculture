package com.darlemlih.apiculture.dto.cart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDto {
    private Long id;
    private Long productId;
    private String productName;
    private String productSlug;
    private String productImage;
    private BigDecimal unitPrice;
    private Integer quantity;
    private BigDecimal totalPrice;
    private Integer stockQuantity;
}
