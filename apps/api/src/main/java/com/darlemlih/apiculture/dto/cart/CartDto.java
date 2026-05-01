package com.darlemlih.apiculture.dto.cart;

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
public class CartDto {
    private Long id;
    private List<CartItemDto> items;
    private BigDecimal subtotal;
    private BigDecimal shippingCost;
    private BigDecimal total;
    private String currency;
    private Integer totalItems;
}
